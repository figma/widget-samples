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

const runCommand = (command, cwd) => {
  console.log(`[RUNNING] cmd=${command} in dir=${cwd}`)
  return execSync(command, { cwd, encoding: 'utf8' })
}

const validTargets = ['test']
const target = process.argv[2]
if (!validTargets.includes(target)) {
  throw new Error(`Invalid target: ${target}, expected one of ${validTargets}`)
}

SAMPLES.forEach((dir) => {
  runCommand(`npm ci`, dir)
  const output = runCommand(`npm run ${target}`, dir)
  if (target === 'test' && output.includes('Error: no test specified')) {
    throw new Error('no test specified')
  }
  console.log(output)
})
