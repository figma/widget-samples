# Undo / Redo in Widgets

# API 

Undo/redo is enabled for all widgets, so there is no public API to control it. We hope that this will provide a consistent developing and user experience. 

# How undo / redo works

Each user has their own undo / redo “stack”, which will keep track of changes to synced state and synced map variables (or synced variable for short). 

You can think of the synced state and synced map variable stored in one big mapping. For example, if your widget writes

    const [count, setCount] = useSyncedState("count", 0)
    const [countMap] = useSyncedMap("countMap")
    ...
    countMap.set("userA", 1)
    countMap.set("userB", 2)

This can be visualized as

    {
      count: 0
      countMap-userA: 1
      countMap-userB: 2
    }

When a user interacts with a widget that causes a change into a synced variable, we determine what changed and push the old values onto the stack. If the user then undoes, we pop the values from the stack, apply the changes to the existing mapping, and re-render the widget, so any visual changes can adapt to the changing synced state. 


# Examples with Counter widget 

## Single user + synced state 

Let’s say the counter widget is implemented with a simple synced state variable:

    const [count, setCount] = useSyncedState("count", 0)

The following table describes a series of actions and the resulting widget state, widget display, and each user’s undo/redo stack. To keep things simple, we will just look at undo, but redo works exactly the same way. 

| Action            | Widget State   | User A undo stack           | Widget Displays |
| ----------------- | -------------- | --------------------------- | --------------- |
| Initial           | `{ count: 0 }` | `[]`                        | 0               |
| User A increments | `{ count: 1 }` | `[{count: 0}]`              | 1               |
| User A increments | `{ count: 2 }` | `[ {count: 1}, {count: 0}]` | 2               |
| User A undoes     | `{ count: 1 }` | `[{count: 0}]`              | 1               |
| User A undoes     | `{ count: 0 }` | `[]`                        | 0               |

The following actions and results are straightforward and consistent with expectations. When we add another user interacting with the widget, though, things can be a little more confusing. 


## Two users + synced state 

The widget is still using a single synced state variable, but let’s see what happens when two users interact with the widget. 


| Action            | Widget State   | User A undo/redo stack | User B undo/redo stack | Widget Displays |
| ----------------- | -------------- | ---------------------- | ---------------------- | --------------- |
| Initial           | `{ count: 0 }` | `[]`                   | `[]`                   | 0               |
| User A increments | `{ count: 1 }` | `[{count: 0}]`         | `[]`                   | 1               |
| User B increments | `{ count: 2 }` | `[{count: 0}]`         | `[{count: 1}]`         | 2               |
| User A undoes     | `{ count: 0 }` | `[]`                   | `[{count: 1}]`         | 0               |
| User B undoes     | `{ count: 1 }` | `[]`                   | `[]`                   | 1               |


When User A undoes, the count goes from 2 → 0, which may be considered unexpected. This happens because when User A incremented, they saved the previous synced value `{ count: 0 }`, which was restored when they committed an undo action. To the observer, though, it looks like User A has somehow undone User B’s action. Similarly, when User B undoes, the count gets set back to 1. 


## Two users + synced map 

What we really want is to keep track of each user’s individual counts and then display the sum of all counts. 

Here are some code snippets on how this would be implemented:

    const [countMap] = useSyncedMap("countMap")
    ...
    // increment function 
    function increment() {
       const { sessionId } = figma.currentUser; // can use figma.currentUser.id
        const value = countMap.get(sessionId.toString());
        countMap.set(sessionId.toString(), value + 1);
    }
    
    // total count function 
    function totalCount() {
        const values = countMap.values();
        if (values.length > 0) {
            return values.reduce((a, b) => a + b);
        }
        return 0;
    }

| Action            | Widget State                     | User A undo             | User B undo             | Widget Displays |
| ----------------- | -------------------------------- | ----------------------- | ----------------------- | --------------- |
| Initial           | `{ }`                            | `[]`                    | `[]`                    | 0               |
| User A increments | `{ countMap-A : 1 }`             | `[{countMap-A : null}]` | `[]`                    | 1               |
| User B increments | `{ countMap-A : 1, count-B : 1}` | `[{countMap-A : null}]` | `[{countMap-B : null}]` | 2               |
| User A undoes     | `{ countMap-B : 1 }`             | `[]`                    | `[{countMap-B : null}]` | 1               |
| User B undoes     | `{ }`                            | `[]`                    | `[]`                    | 0               |

*Note that* `*{count:A : null}*` *simply means this value was just added and that we should remove that key if this is applied to the synced state in an undo.*  

Here, we can see that instead of undoing another user’s actions, User A simply delete’s their own count key when they undo, preserving User B’s count. This way, the widget correctly displays 1 after the first undo. 


# When to useSyncedMap vs useSyncedState 

Overall, when you want to preserve unique objects or actions, it is important to `useSyncedMap`, so these values are not overwritten when a user commits an undo or redo. For more information, read [Widget State and Multiplayer.](https://www.figma.com/widget-docs/widget-state-and-multiplayer/)

There are some times that `useSyncedState` is sufficient. For example, let’s say you are storing the “theme” of your widget in a synced state. If User A changes this value from “gray” to “red”, then User B changes the value from “red” to “blue”. When User A undoes, the value will go back to “gray”. As a user, this behavior is probably fine. 
[](https://www.figma.com/widget-docs/widget-state-and-multiplayer/)

# Undoing Plugin API methods in a Widget 

Let’s say your widget also utilizes the plugin API to make some actions. To register a set of actions as part of the undo/redo stack, you can use `[figma.commitUndo()](https://www.figma.com/plugin-docs/api/properties/figma-commitundo/)` . 
