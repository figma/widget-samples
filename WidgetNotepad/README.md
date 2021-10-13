Notepad
===

This sample widget should work out of the box without any build steps.
However if you want to tweak the widget source code, read on!


# Installation

You'll need node.js installed. You can find the download link for it here: https://nodejs.org/en/download/


Install the dependencies for building this widget:

```bash
npm ci
```

NOTE: This sample uses a local version of plugin-typings since the widget types are not yet publicly available.

# Building the widget

Any changes to `code.tsx` needs to be compiled into the corresponding `code.js` file.

```bash
npm run build

npm run build:watch // build and rebuild on any changes
```

# Issues / Bugs

If you find anything bugs or have any questions, please reach out in the private beta Slack channel.