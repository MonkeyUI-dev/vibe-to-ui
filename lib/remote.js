'use strict';

const fs = require('fs');
const path = require('path');

const git = require('./git');

const SYNC_COMMIT_MESSAGE = 'chore: sync design context';

function profilesDir(root) {
  return path.join(root, 'profiles');
}

function listProfileIds(root) {
  const dir = profilesDir(root);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
    .map((d) => d.name)
    .sort();
}

function hasLocalProfileContent(root) {
  const dir = profilesDir(root);
  if (!fs.existsSync(dir)) return false;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.some((e) => !e.name.startsWith('.'));
}

function validateTokensJson(root) {
  const ids = listProfileIds(root);
  const errors = [];
  for (const id of ids) {
    const tokensPath = path.join(profilesDir(root), id, 'tokens.json');
    if (!fs.existsSync(tokensPath)) continue;
    const raw = fs.readFileSync(tokensPath, 'utf8');
    try {
      JSON.parse(raw);
    } catch (err) {
      errors.push(`profiles/${id}/tokens.json: ${err.message}`);
    }
  }
  if (errors.length > 0) {
    throw new Error(
      `Invalid tokens.json — sync aborted before commit.\n` + errors.map((e) => `  - ${e}`).join('\n')
    );
  }
}

function requireRepoWithOrigin(root) {
  if (!git.isRepo(root)) {
    throw new Error(
      `No Git repository at ${root}.\n` +
        `Run: vibe-to-ui context remote connect <git-url>`
    );
  }
  const url = git.getRemoteUrl(root);
  if (!url) {
    throw new Error(
      `No origin remote configured under ${root}.\n` +
        `Run: vibe-to-ui context remote connect <git-url>`
    );
  }
  return url;
}

/**
 * Bind ~/.vibe-to-ui to a private Git remote. Never overwrites local profiles
 * or pushes unknown local data.
 */
function cmdRemoteConnect(root, gitUrl) {
  if (!gitUrl || String(gitUrl).trim() === '') {
    throw new Error('Missing git URL. Usage: vibe-to-ui context remote connect <git-url>');
  }
  const url = String(gitUrl).trim();

  // Caller must ensure root exists and is writable (Computer B restore path).
  const createdRepo = git.ensureRepo(root);
  const remoteAction = git.addOrVerifyRemote(root, url);

  console.log(`Design Context root: ${root}`);
  if (createdRepo) console.log('Initialized Git repository (branch: main).');
  if (remoteAction === 'added') console.log(`Added origin: ${url}`);
  else console.log(`Origin already set: ${url}`);

  const fetch = git.fetchOrigin(root);
  if (fetch.status !== 0) {
    const detail = fetch.stderr || fetch.stdout || `exit ${fetch.status}`;
    throw new Error(
      `Connected origin but fetch failed: ${detail}\n` +
        `Check SSH/HTTPS credentials and that the remote is reachable.`
    );
  }
  console.log('Fetched origin.');

  const localContent = hasLocalProfileContent(root);
  const remoteHasMain = git.remoteBranchExists(root, git.DEFAULT_BRANCH);

  if (!localContent && remoteHasMain) {
    // Drop an untracked seed .gitignore so checkout can restore the remote copy.
    const ignorePath = path.join(root, '.gitignore');
    if (fs.existsSync(ignorePath)) {
      const tracked = git.runGit(root, ['ls-files', '--error-unmatch', '.gitignore'], {
        allowFailure: true,
      });
      if (tracked.status !== 0) fs.unlinkSync(ignorePath);
    }
    git.checkoutRemoteMain(root, git.DEFAULT_BRANCH);
    const createdIgnore = git.ensureGitignore(root);
    if (createdIgnore) console.log('Created .gitignore (secrets excluded).');
    const ids = listProfileIds(root);
    console.log('Local profiles were empty — restored from remote.');
    if (ids.length > 0) {
      console.log(`Profiles: ${ids.join(', ')}`);
    } else {
      console.log('Remote main has no profiles yet.');
    }
    console.log('Status: Connected');
    return;
  }

  const createdIgnore = git.ensureGitignore(root);
  if (createdIgnore) console.log('Created .gitignore (secrets excluded).');

  if (localContent && !remoteHasMain) {
    console.log('Local profiles present; remote has no main branch yet.');
    console.log('Nothing was uploaded. Run: vibe-to-ui context sync');
    console.log('Status: Connected (awaiting first sync)');
    return;
  }

  if (localContent && remoteHasMain) {
    console.log('Local profiles and remote main both exist.');
    console.log('Nothing was overwritten or uploaded.');
    console.log('Next: vibe-to-ui context remote status');
    console.log('Then: vibe-to-ui context sync');
    console.log('Status: Connected');
    return;
  }

  // empty + empty
  console.log('Remote is empty and no local profiles yet.');
  console.log('Create a profile with --init, then run: vibe-to-ui context sync');
  console.log('Status: Connected');
}

function formatAheadBehind({ ahead, behind }) {
  if (ahead == null && behind == null) return 'No upstream (remote main not fetched yet)';
  if (behind == null) return 'Remote main present; local history not compared';
  const parts = [];
  if (behind > 0) parts.push(`Behind ${behind} commit${behind === 1 ? '' : 's'}`);
  if (ahead > 0) parts.push(`Ahead ${ahead} commit${ahead === 1 ? '' : 's'}`);
  if (parts.length === 0) return 'In sync with origin/main';
  return parts.join(', ');
}

function cmdRemoteStatus(root) {
  const url = requireRepoWithOrigin(root);

  // Best-effort fetch for fresh ahead/behind; status still prints if offline.
  const fetch = git.fetchOrigin(root);
  const fetchOk = fetch.status === 0;

  const branch = git.currentBranch(root) || '(unknown)';
  const changes = git.porcelainStatus(root);
  const ab = git.aheadBehind(root, git.DEFAULT_BRANCH);
  const rebase = git.isRebaseInProgress(root);
  const conflicts = rebase ? git.unmergedPaths(root) : [];

  console.log('Design Context Remote');
  console.log('');
  console.log('Remote:');
  console.log(url);
  console.log('');
  console.log('Branch:');
  console.log(branch);
  console.log('');
  console.log('Local changes:');
  if (changes.length === 0) {
    console.log('(none)');
  } else {
    for (const c of changes) {
      console.log(`- ${c.path}`);
    }
  }
  console.log('');
  console.log('Remote:');
  if (!fetchOk) {
    console.log(`Fetch failed (${fetch.stderr || fetch.stdout || 'offline'}); counts may be stale.`);
  }
  console.log(formatAheadBehind(ab));
  console.log('');

  let statusLine = 'Up to date';
  if (rebase || conflicts.length > 0) {
    statusLine = 'Conflict detected';
  } else if (changes.length > 0 || (ab.behind != null && ab.behind > 0) || (ab.ahead != null && ab.ahead > 0)) {
    statusLine = 'Sync required';
  } else if (!git.remoteBranchExists(root) && (changes.length > 0 || hasLocalProfileContent(root))) {
    statusLine = 'Sync required';
  }

  console.log('Status:');
  console.log(statusLine);

  if (conflicts.length > 0) {
    console.log('');
    console.log('Conflicted files:');
    for (const p of conflicts) console.log(`- ${p}`);
  }
}

function printConflictAndAbort(root, paths) {
  console.error('Conflict detected:');
  for (const p of paths) {
    console.error(p);
  }
  console.error('');
  console.error('No files were overwritten.');
  git.rebaseAbort(root);
}

function cmdSync(root) {
  requireRepoWithOrigin(root);
  git.ensureGitignore(root);

  validateTokensJson(root);

  const fetch = git.fetchOrigin(root);
  if (fetch.status !== 0) {
    const detail = fetch.stderr || fetch.stdout || `exit ${fetch.status}`;
    throw new Error(`git fetch origin failed: ${detail}`);
  }

  if (git.isRebaseInProgress(root)) {
    const paths = git.unmergedPaths(root);
    printConflictAndAbort(root, paths.length > 0 ? paths : ['(rebase in progress)']);
    process.exitCode = 1;
    return;
  }

  git.stageSafePaths(root);
  if (git.hasStagedChanges(root)) {
    git.commitStaged(root, SYNC_COMMIT_MESSAGE);
    console.log(`Committed local changes: ${SYNC_COMMIT_MESSAGE}`);
  } else {
    console.log('No local Design Context changes to commit.');
  }

  const remoteHasMain = git.remoteBranchExists(root, git.DEFAULT_BRANCH);
  if (remoteHasMain && git.hasLocalCommits(root)) {
    const pull = git.pullRebase(root, git.DEFAULT_BRANCH);
    if (pull.status !== 0) {
      const conflicted = git.unmergedPaths(root);
      // Also parse "CONFLICT" paths from stderr if diff-filter is empty mid-abort.
      let paths = conflicted;
      if (paths.length === 0) {
        const fromErr = (pull.stderr || '')
          .split('\n')
          .map((line) => {
            const m = line.match(/CONFLICT(?:\s+\([^)]+\))?:\s+(?:Merge conflict in|.*?in)\s+(.+)$/i);
            return m ? m[1].trim() : null;
          })
          .filter(Boolean);
        paths = fromErr;
      }
      if (paths.length === 0 && /conflict/i.test(pull.stderr || pull.stdout || '')) {
        paths = ['(see git status)'];
      }
      if (paths.length > 0 || /conflict/i.test(pull.stderr || '') || git.isRebaseInProgress(root)) {
        printConflictAndAbort(root, paths.length > 0 ? paths : ['(unresolved rebase)']);
        process.exitCode = 1;
        return;
      }
      throw new Error(`git pull --rebase failed: ${pull.stderr || pull.stdout || `exit ${pull.status}`}`);
    }
    console.log('Rebased onto origin/main.');
  }

  if (!git.hasLocalCommits(root)) {
    console.log('Nothing to push (no commits yet).');
    return;
  }

  git.pushOrigin(root, git.DEFAULT_BRANCH);
  console.log('Pushed to origin/main.');
  console.log('Status: Synced');
}

module.exports = {
  cmdRemoteConnect,
  cmdRemoteStatus,
  cmdSync,
  validateTokensJson,
  hasLocalProfileContent,
  SYNC_COMMIT_MESSAGE,
};
