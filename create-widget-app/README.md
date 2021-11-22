# create-widget-app

Template app that creates a widget & react iframe.

Code organization:

| dir / path               | description                          |
| ------------------------ | ------------------------------------ |
| ui-src/                  | This is where the iframe code lives  |
| ui-src/index.html        | Main entry point for the iframe code |
| ui-src/tsconfig.json     | tsconfig for the iframe code         |
| widget-src/              | This is where the widget code lives  |
| widget-src/code.tsx      | Main entry point for the widget code |
| widget-src/tsconfig.json | tsconfig for the widget code         |
| dist/                    | Built output goes here               |

- The widget code just uses esbuild to bundle widget-src/code.tsx into one file.
- The iframe code uses a tool called [vite](https://vitejs.dev/) to bundle everything into a single html file

## Getting started

### One-time setup
1. Make a copy of this folder
2. Update manifest.json, package.json and package-lock.json where it says `WidgetTemplate`
3. Install the required dependencies `npm ci`


### Importing your widget
1. "Import widget from manifest"
2. Build code `npm run build`
3. Choose your manifest


## Development

The quickest way to build your widget during development is by running:

```sh
npm run dev
```

This command starts the follow in watch mode:
1. typechecking for widget-src & ui-src
2. bundling for widget-src & ui-src
3. starts a vite dev server that servesr ui-src/index.html at localhost:3000

## Other scripts

| script                   | description                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| npm run build            | one-off full build of both the iframe and widget                        |
| npm run build:production | one-off full production (minified) build of both the iframe and widget  |
| npm run build:main       | one-off build of the widget code                                        |
| npm run build:ui         | one-off build of the iframe code                                        |
| npm run tsc              | typecheck both the iframe and widget                                    |

# Issues / Bugs

For more information about widgets, please visit the widget documentation at https://www.figma.com/widget-docs.

If you find anything bugs or have any questions, please reach out via https://www.figma.com/widget-docs/get-help/.
