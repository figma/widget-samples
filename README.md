Widget Samples
===

Sample [widgets](https://www.figma.com/widget-docs)!

## Widgets

### Widget Counter

A simple counter widget that showcases `<Frame>`, `<Text>`, `useSyncedState`, `usePropertyMenu`, and `onClick`.
  
![Counter Widget](https://user-images.githubusercontent.com/610102/137216292-d442a0b3-34cd-4e27-ac1d-f633af7b8322.png)

### Widget Notepad

A widget that showcases opening an iframe to get additional user input and the `useEffect` hook.
  
![Notepad Widget](https://user-images.githubusercontent.com/610102/137217269-98b1503f-029c-4fd0-844c-0a5a91eb5ae8.png)

### Widget UserBadge

A widget that makes use of `<Image>` and `figma.currentUser.photoUrl`.

![UserBadge Widget](https://user-images.githubusercontent.com/610102/137217761-6c8918f0-de99-4f60-9404-eb31e738017d.png)

### Widget Table

A simple table widget that showcases `useSyncedMap` to support concurrent updates to the widget and the `key` prop.
  
![Table Widget](https://user-images.githubusercontent.com/610102/137217507-4a2c6bbc-01a2-4e3e-966d-a686353d3f2d.png)

### Widget Multiplayer Counter

A multiplayer-safe counter widget that uses `useSyncedMap` and `figma.activeUsers[0].sessionId`

![Multiplayer Counter Widget](https://user-images.githubusercontent.com/610102/137217397-4e15c6f2-e33c-424f-93b3-e8a7ac743957.png)

### create-widget-app
  
An template widget that opens an iframe whose contents is rendered using React. This mainly serves to demonstrate how to structure  code for non-trivial widgets and their iframes.
