'use strict';

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DEFAULT_BRANCH = 'main';
const REMOTE_NAME = 'origin';

const GITIGNORE_CONTENT = `# vibe-to-ui Design Context — do not sync secrets
.env
.env.*
*.pem
*.key
*credentials*
id_rsa
id_rsa.*
id_ed25519
id_ed25519.*
.DS_Store
.write-check-*
`;

function runGit(cwd, args, options = {}) {
  const { allowFailure = false, input } = options;
  const result = spawnSync('git', args, {
    cwd,
    encoding: 'utf8',
    input: input != null ? input : undefined,
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
  });

  if (result.error) {
    if (result.error.code === 'ENOENT') {
      throw new Error(
        'git is required for Design Context remote sync but was not found on PATH. Install Git and retry.'
      );
    }
    throw new Error(`git ${args.join(' ')} failed: ${result.error.message}`);
  }

  const stdout = (result.stdout || '').trim();
  const stderr = (result.stderr || '').trim();

  if (result.status !== 0 && !allowFailure) {
    const detail = stderr || stdout || `exit ${result.status}`;
    const err = new Error(`git ${args.join(' ')} failed: ${detail}`);
    err.status = result.status;
    err.stdout = stdout;
    err.stderr = stderr;
    throw err;
  }

  return { status: result.status, stdout, stderr };
}

function isRepo(cwd) {
  const r = runGit(cwd, ['rev-parse', '--is-inside-work-tree'], { allowFailure: true });
  return r.status === 0 && r.stdout === 'true';
}

function ensureRepo(cwd) {
  if (isRepo(cwd)) return false;
  runGit(cwd, ['init']);
  // Prefer main as the default branch for new repos.
  const branch = currentBranch(cwd);
  if (branch && branch !== DEFAULT_BRANCH) {
    runGit(cwd, ['branch', '-M', DEFAULT_BRANCH], { allowFailure: true });
  } else if (!branch) {
    runGit(cwd, ['checkout', '-b', DEFAULT_BRANCH], { allowFailure: true });
  }
  return true;
}

function ensureGitignore(cwd) {
  const ignorePath = path.join(cwd, '.gitignore');
  if (fs.existsSync(ignorePath)) return false;
  fs.writeFileSync(ignorePath, GITIGNORE_CONTENT, 'utf8');
  return true;
}

function getRemoteUrl(cwd, name = REMOTE_NAME) {
  const r = runGit(cwd, ['remote', 'get-url', name], { allowFailure: true });
  if (r.status !== 0) return null;
  return r.stdout || null;
}

function addOrVerifyRemote(cwd, url, name = REMOTE_NAME) {
  const existing = getRemoteUrl(cwd, name);
  if (!existing) {
    runGit(cwd, ['remote', 'add', name, url]);
    return 'added';
  }
  if (normalizeRemoteUrl(existing) !== normalizeRemoteUrl(url)) {
    throw new Error(
      `Remote "${name}" is already set to ${existing}\n` +
        `Refusing to replace it with ${url}.\n` +
        `Remove or update the remote manually if you intend to switch repositories.`
    );
  }
  return 'unchanged';
}

function normalizeRemoteUrl(url) {
  return String(url || '')
    .trim()
    .replace(/\.git$/i, '')
    .replace(/\/$/, '');
}

function fetchOrigin(cwd) {
  return runGit(cwd, ['fetch', REMOTE_NAME], { allowFailure: true });
}

function remoteBranchExists(cwd, branch = DEFAULT_BRANCH) {
  const ref = `refs/remotes/${REMOTE_NAME}/${branch}`;
  const r = runGit(cwd, ['show-ref', '--verify', '--quiet', ref], { allowFailure: true });
  return r.status === 0;
}

function currentBranch(cwd) {
  const r = runGit(cwd, ['branch', '--show-current'], { allowFailure: true });
  if (r.status !== 0) return null;
  return r.stdout || null;
}

function hasLocalCommits(cwd) {
  const r = runGit(cwd, ['rev-parse', '--verify', 'HEAD'], { allowFailure: true });
  return r.status === 0;
}

function porcelainStatus(cwd) {
  const r = runGit(cwd, ['status', '--porcelain'], { allowFailure: true });
  if (r.status !== 0) return [];
  if (!r.stdout) return [];
  return r.stdout.split('\n').filter(Boolean).map((line) => {
    // XY PATH or XY ORIG -> PATH for renames
    const pathPart = line.slice(3);
    const arrow = pathPart.indexOf(' -> ');
    const filePath = arrow >= 0 ? pathPart.slice(arrow + 4) : pathPart;
    return { raw: line, path: filePath };
  });
}

function aheadBehind(cwd, branch = DEFAULT_BRANCH) {
  if (!remoteBranchExists(cwd, branch)) {
    return { ahead: null, behind: null, upstream: null };
  }
  const upstream = `${REMOTE_NAME}/${branch}`;
  if (!hasLocalCommits(cwd)) {
    return { ahead: 0, behind: null, upstream };
  }
  const r = runGit(cwd, ['rev-list', '--left-right', '--count', `HEAD...${upstream}`], {
    allowFailure: true,
  });
  if (r.status !== 0 || !r.stdout) {
    return { ahead: null, behind: null, upstream };
  }
  const [left, right] = r.stdout.split(/\s+/).map((n) => Number(n));
  return {
    ahead: Number.isFinite(left) ? left : null,
    behind: Number.isFinite(right) ? right : null,
    upstream,
  };
}

function isRebaseInProgress(cwd) {
  const gitDir = runGit(cwd, ['rev-parse', '--git-dir'], { allowFailure: true });
  if (gitDir.status !== 0) return false;
  const dir = path.resolve(cwd, gitDir.stdout);
  return (
    fs.existsSync(path.join(dir, 'rebase-merge')) ||
    fs.existsSync(path.join(dir, 'rebase-apply'))
  );
}

function unmergedPaths(cwd) {
  const r = runGit(cwd, ['diff', '--name-only', '--diff-filter=U'], { allowFailure: true });
  if (r.status !== 0 || !r.stdout) return [];
  return r.stdout.split('\n').filter(Boolean);
}

function checkoutRemoteMain(cwd, branch = DEFAULT_BRANCH) {
  // Restore remote content into an empty local tree without pushing.
  runGit(cwd, ['checkout', '-B', branch, `${REMOTE_NAME}/${branch}`]);
}

function stageSafePaths(cwd) {
  const profiles = path.join(cwd, 'profiles');
  const ignore = path.join(cwd, '.gitignore');
  const args = ['add', '-A', '--'];
  if (fs.existsSync(profiles)) args.push('profiles');
  if (fs.existsSync(ignore)) args.push('.gitignore');
  if (args.length === 3) return; // nothing to add
  runGit(cwd, args);
}

function hasStagedChanges(cwd) {
  const r = runGit(cwd, ['diff', '--cached', '--quiet'], { allowFailure: true });
  // exit 1 means differences exist
  return r.status === 1;
}

function ensureCommitIdentity(cwd) {
  const name = runGit(cwd, ['config', '--get', 'user.name'], { allowFailure: true });
  const email = runGit(cwd, ['config', '--get', 'user.email'], { allowFailure: true });
  // Local-only fallback so sync works in fresh environments without global git config.
  if (name.status !== 0 || !name.stdout) {
    runGit(cwd, ['config', 'user.name', 'vibe-to-ui']);
  }
  if (email.status !== 0 || !email.stdout) {
    runGit(cwd, ['config', 'user.email', 'vibe-to-ui@localhost']);
  }
}

function commitStaged(cwd, message) {
  ensureCommitIdentity(cwd);
  runGit(cwd, ['commit', '-m', message]);
}

function pullRebase(cwd, branch = DEFAULT_BRANCH) {
  return runGit(cwd, ['pull', '--rebase', REMOTE_NAME, branch], { allowFailure: true });
}

function rebaseAbort(cwd) {
  runGit(cwd, ['rebase', '--abort'], { allowFailure: true });
}

function pushOrigin(cwd, branch = DEFAULT_BRANCH) {
  runGit(cwd, ['push', '-u', REMOTE_NAME, branch]);
}

module.exports = {
  DEFAULT_BRANCH,
  REMOTE_NAME,
  GITIGNORE_CONTENT,
  runGit,
  isRepo,
  ensureRepo,
  ensureGitignore,
  getRemoteUrl,
  addOrVerifyRemote,
  normalizeRemoteUrl,
  fetchOrigin,
  remoteBranchExists,
  currentBranch,
  hasLocalCommits,
  porcelainStatus,
  aheadBehind,
  isRebaseInProgress,
  unmergedPaths,
  checkoutRemoteMain,
  stageSafePaths,
  hasStagedChanges,
  commitStaged,
  pullRebase,
  rebaseAbort,
  pushOrigin,
};
