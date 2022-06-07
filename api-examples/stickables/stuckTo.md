# `stuckTo`

`stuckTo` is a new field that exists on `WIDGET`, `HIGHLIGHT`, and `STAMP` nodes that returns the node that the stickable is stuck to or `null`.

Check this example below that prints out all of the stamps that are stuck to sticky notes:

```ts
const stampsStuckToStickyNotes = figma.currentPage.findAll(
  (n) => n.type === "STAMP" && n.stuckTo?.type === "STICKY"
);

console.log(stampsStuckToStickyNotes);
```
