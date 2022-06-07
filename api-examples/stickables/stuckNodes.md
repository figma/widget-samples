# `stuckNodes`

All `SceneNodes` now have the `stuckNodes` property that returns an array of nodes that is stuck to them.

This example below finds the sticky note with the most stamps on it:

```ts
const stickies = figma.currentPage.findAllWithCriteria({
  types: ["STICKY"],
});

let maxStampCount = 0;
let topSticky = null;
for (const sticky of stickies) {
  const stampCount = sticky.stuckNodes.filter((n) => n.type === "STAMP").length;
  if (stampCount > maxStampCount) {
    maxStampCount = stampCount;
    topSticky = sticky;
  }
}

console.log(topSticky);
```
