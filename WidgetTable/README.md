# Table

A simple table widget that showcases `useSyncedMap` to support concurrent updates to the widget and the `key` prop.

Code organization:

| dir / path               | description                          |
| ------------------------ | ------------------------------------ |
| widget-src/              | This is where the widget code lives  |
| widget-src/code.tsx      | Main entry point for the widget code |
| widget-src/tsconfig.json | tsconfig for the widget code         |
| dist/                    | Built output goes here               |

- The widget code is built using esbuild to bundle widget-src/code.tsx into one file.

## Getting started

### One-time setup

1. Make a copy of this folder
2. Update manifest.json, package.json and package-lock.json where it says `name: ...`
3. Install the required dependencies `npm ci`

### Importing your widget

1. "Import widget from manifest"
2. Build code `npm run build`
3. Choose your manifest.json

## Development

The quickest way to build your widget during development is by running:

```sh
npm run dev
```

This command starts the follow in watch mode:

1. typechecking for widget-src
2. building for widget-src

While this command is running, any changes to `widget-src/code.tsx` will be compiled into the `dist/code.js` file that is referenced by the manifest.json.

## Other scripts

| script        | description                      |
| ------------- | -------------------------------- |
| npm run build | one-off full build of the widget |
| npm run test  | typecheck the widget code        |

# Issues / Bugs

For more information about widgets, please visit the widget documentation at https://www.figma.com/widget-docs.

If you find anything bugs or have any questions, please reach out via https://www.figma.com/widget-docs/get-help/.
