# `useSickableHost`

## Overview

`useStickableHost` lets your widget run a callback when a stickable is added or removed to your widget. By default all widgets are already stickable hosts so you don't have to call this if you just want stamps to stick to your widget.

## Callback

`useStickableHost` takes a single callback that runs whenever a user adds or removes a stickable from your widget.

It takes a `WidgetAttachedStickablesChangedEvent`

```ts
interface WidgetAttachedStickablesChangedEvent {
  newStuckNodeIds: string[];
  oldStuckNodeIds: string[];
}
```

## Example

This widget is a rectangle that you can stamps in and it will display how many of each stamp type are present on the widget.

```jsx
function StampVote() {
  const [votes, setVotes] = useSyncedState("votes", {});
  const widgetID = useWidgetId();

  useStickableHost(() => {
    const widget = figma.getNodeById(widgetID);
    if (!widget) {
      return;
    }
    const newVotes: { [key: string]: number } = {};
    const { stuckNodes } = widget;
    for (const node of stuckNodes) {
      if (!node || node.type !== "STAMP") {
        continue;
      }

      newVotes[node.name] = newVotes[node.name] || 0;
      newVotes[node.name] += 1;
    }

    setVotes(newVotes);
  });

  return (
    <AutoLayout
      fill={"#FFFFFF"}
      stroke={"#E6E6E6"}
      padding={16}
      direction="vertical"
      width={300}
      height={300}
      verticalAlignItems="end"
    >
      {Object.keys(votes).map((name) => (
        <Text>
          {name}: {votes[name]}
        </Text>
      ))}
    </AutoLayout>
  );
}
```

## Other Rules

In FigJam a node is either a stickable or a stickable host, but never both. You cannot call `useStickable` and `useStickableHost` in the same render of a widget; it can only be one or the other.

By default all widgets are stickable hosts and can let stamps and other stickables stick to them. Calling `useStickableHost` doesn't let non stickables attach to your widget.
