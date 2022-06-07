# Ellipse ArcData

Our Ellipse component now supports an `arcData` prop.

The `arcData` prop matches the shape of the corresponding property in our Plugin API: https://www.figma.com/plugin-docs/api/ArcData/

```
type ArcData = {
  startingAngle: number
  endingAngle: number
  innerRadius: number
}
```

## Usage example:

```tsx
<Ellipse
  arcData={{
    startingAngle: 0,
    endingAngle: Math.PI,
    innerRadius: 0
  }}
/>
```
