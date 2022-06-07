# Fragment

The Widget API now supports JSX Fragments

To set this up, you need to add the following line to your tsconfig.json

```json
{
  "compilerOptions": {
    "jsxFactory": "figma.widget.h",

    // Add this line
    "jsxFragmentFactory": "figma.widget.Fragment",

    ...
  }
}
```

When writing JSX, you can now use the following syntax (similar to you'd use fragments in React)

```tsx
function NameList({ names }: { names: string[] }) {
  return (
    <>
      {names.map(name => <Text key={name}>{name}</Text>)}
    </>
  )
}
```

Alternatively, if you can also reference the `Fragment` component directly if you need to:

```tsx
const { widget } = figma
const { Fragment } = widget
```

This is useful if you need to specify the `key` prop on the Fragment component when returning lists of Fragments.

The `Fragment` component does not take any props outside of an optional `key` prop.
