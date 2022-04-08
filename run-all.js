#!/usr/bin/env node

const { execSync } = require('child_process')
const path = require('path')
const cwd = process.cwd()

const SAMPLES = [
  path.join(cwd, 'WidgetCounter'),
  path.join(cwd, 'WidgetNotepad'),
  path.join(cwd, 'WidgetUserBadge'),
  path.join(cwd, 'WidgetMultiplayerCounter'),
  path.join(cwd, 'create-widget-app'),
]

const VALID_TARGETS = [
  'test',
  'update-typings',
]

const target = process.argv[2]
if (!VALID_TARGETS.includes(target)) {
  throw new Error(`Invalid target: ${target}. Expected one of: ${JSON.stringify(VALID_TARGETS)}`)
}

const runCommand = (command, cwd) => {
  console.log(`[RUNNING] cmd=${command} in dir=${cwd}`)
  return execSync(command, { cwd, encoding: 'utf8' })
}

switch (target) {
  case 'test':
    SAMPLES.forEach((dir) => {
      runCommand(`npm ci`, dir)
      const output = runCommand(`npm run ${target}`, dir)
      if (output.includes('Error: no test specified')) {
        throw new Error('no test specified')
      }
      console.log(output)
    })
    break;
  case 'update-typings':
    SAMPLES.forEach((dir) => {
      runCommand(`npm install -D @figma/plugin-typings@latest`, dir)
      runCommand(`npm install -D @figma/widget-typings@latest`, dir)
    })
    break;
}
