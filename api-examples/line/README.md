# Line

We added a simple `<Line />` component that you can use to draw a line inside your widget.

This component supports the following notable, optional props:

```ts
interface LineProps {
  length?: number | "fill-parent"

  strokeWidth?: number

  stroke?: HexCode | Color | SolidPaint | SolidPaint[];
}
```

Line components have the following defaults:

```ts
{
  name: '',
  hidden: false,
  stroke: '#000000',
  strokeWidth: 1,
  blendMode: 'pass-through',
  opacity: 1,
  fill: [],
  effect: [],
  length: 100,
  x: 0,
  y: 0,
}
```
