#!/usr/bin/env node
'use strict';

const argv = process.argv;
const cmd = argv[2];

function printRootHelp() {
  console.log(`vibe-to-ui — local Design Context + Inspiration + Page Direction CLI

Usage:
  vibe-to-ui context …              Design Context profiles (~/.vibe-to-ui/profiles)
  vibe-to-ui inspiration …          Inspiration Library (~/.vibe-to-ui/inspirations)
  vibe-to-ui page-direction …       Page Direction memory + local search
  vibe-to-ui -h | --help

Examples:
  vibe-to-ui context --list
  vibe-to-ui inspiration add https://example.com
  vibe-to-ui page-direction init --slug my-landing
  vibe-to-ui page-direction search editorial hero
  vibe-to-ui page-direction record my-landing --choice B --reason "stronger proof moment"

Root is always ~/.vibe-to-ui (no env override). Skill reinstall must never touch it.
`);
}

if (!cmd || cmd === '-h' || cmd === '--help') {
  printRootHelp();
  process.exit(0);
}

if (cmd === 'context') {
  require('../lib/context').main(argv);
} else if (cmd === 'inspiration') {
  require('../lib/inspiration').main(argv);
} else if (cmd === 'page-direction') {
  require('../lib/page-direction').main(argv);
} else {
  console.error(
    `error: Unknown command "${cmd}". Use "context", "inspiration", or "page-direction".`
  );
  process.exitCode = 1;
}
