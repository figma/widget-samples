# create-widget-app

Template app that creates a widget & react iframe.

Code organization:

| dir / path           | description                          |
| -------------------- | ------------------------------------ |
| ui-src/              | This is where the iframe code lives  |
| ui-src/index.html    | Main entry point for the iframe code |
| ui-src/tsconfig.json | tsconfig for the iframe code         |
| code.tsx             | This is the widget code              |
| tsconfig.json        | tsconfig for the widget code         |
| dist/                | Built output goes here               |

- The widget code just uses tsc directly like most of our plugin/widget samples
- The iframe code uses a tool called [vite](https://vitejs.dev/) to bundle everything into a single html file

## Getting started


### one-time setup
1. Make a copy of this folder
2. Update manifest.json, package.json and package-lock.json where it says `WidgetTemplate`
3. Install the required dependencies `npm ci`


### importing your widget
1. "Import widget from manifest"
2. Build code `npm run build`
3. Choose your manifest

## iframe development

Often the code in the iframe can get pretty complex, if helpful, you can also do

```
npm run dev:ui
```

- This command starts a development server that will serve the iframe code at http://localhost:3000
- The development server will also hot reload any changes to your iframe code


## Scripts

| script                   | description                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| npm run build            | one-off full build of both the iframe and widget                        |
| npm run build:main       | one-off build of the widget code                                        |
| npm run build:ui         | one-off build of the iframe code                                        |
| npm run build:main:watch | watch-mode build of the widget code. rebuilds if when you save changes. |
| npm run build:ui:watch   | watch-mode build of the iframe code. rebuilds if when you save changes. |