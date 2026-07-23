#!/usr/bin/env node
'use strict';

const argv = process.argv;
const cmd = argv[2];

function printRootHelp() {
  console.log(`vibe-to-ui — local Design Context + Inspiration Library CLI

Usage:
  vibe-to-ui context …        Design Context profiles under ~/.vibe-to-ui/profiles
  vibe-to-ui inspiration …    Inspiration Library under ~/.vibe-to-ui/inspirations
  vibe-to-ui -h | --help

Examples:
  vibe-to-ui context --list
  vibe-to-ui context --profile demo --init
  vibe-to-ui inspiration add https://example.com
  vibe-to-ui inspiration add --image ./shot.png
  vibe-to-ui inspiration list
  vibe-to-ui inspiration link <id> --profile demo
  vibe-to-ui inspiration apply <id> --project . 

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
} else {
  console.error(`error: Unknown command "${cmd}". Use "context" or "inspiration".`);
  process.exitCode = 1;
}
