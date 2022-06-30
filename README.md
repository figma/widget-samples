# Figma and FigJam Widget Samples

Widgets are custom, interactive objects you place in a [Figma](https://figma.com) or [FigJam](https://figma.com/figjam) file to extend functionality.

Widgets are written in a declarative style similar to React components, so developers can define what a widget looks like using a component-based API similar to React. If you have written React before you should feel right at home.

A widget is just a “pure function” that returns what gets rendered inside of a node. They can also have their widget run arbitrary code in response to various user interactions, such as click events. Widgets also have custom property menus similar to FigJam objects.

So far developers have built widgets for people to use together — like voting, polls, and on canvas games. You can see a full list of published [widgets here](https://www.figma.com/community/widgets/widgets).

Ready to make you first widget? Check out our [developer docs](https://www.figma.com/widget-docs) to get started!

## Widgets

### Widget Counter

A simple counter widget that showcases `<Frame>`, `<Text>`, `useSyncedState`, `usePropertyMenu`, and `onClick`.

![Counter Widget](https://user-images.githubusercontent.com/610102/137216292-d442a0b3-34cd-4e27-ac1d-f633af7b8322.png)

### Widget Notepad

A widget that showcases the [`Input`](https://www.figma.com/widget-docs/api/component-Input/) component to get user input directly on the canvas.

![Notepad Widget](https://user-images.githubusercontent.com/97200987/176713532-b80d0221-fc01-4bbc-bb5d-0a152bf127d2.png)

### Widget UserBadge

A widget that makes use of `<Image>` and `figma.currentUser.photoUrl`.

![UserBadge Widget](https://user-images.githubusercontent.com/610102/137217761-6c8918f0-de99-4f60-9404-eb31e738017d.png)

### Widget Table

A simple table widget that showcases `useSyncedMap` to support concurrent updates to the widget and the `key` prop.

![Table Widget](https://user-images.githubusercontent.com/97200987/176718468-40da80cb-2258-4548-b6aa-01e3d163ff03.png)

### Widget Multiplayer Counter

A multiplayer-safe counter widget that uses `useSyncedMap` and `figma.activeUsers[0].sessionId`

![Multiplayer Counter Widget](https://user-images.githubusercontent.com/610102/137217397-4e15c6f2-e33c-424f-93b3-e8a7ac743957.png)

### Widget Toast

Demonstrating how to use a UI to send messages to a widget.

![Toast Widget](https://user-images.githubusercontent.com/97200987/176731176-c317be3b-14c1-4a8b-819b-4f08001ac282.png)

### Widget Simple Annotate

A simple widget for creating inline-editable annotations. It is [published to the community](https://www.figma.com/community/widget/1121551206624878752/Simple-Annotate).

![Simple Annotate widget usage video](WidgetSimpleAnnotate/WidgetSimpleAnnotate.gif)

### create-widget-app

An template widget that opens an iframe whose contents is rendered using React. This mainly serves to demonstrate how to structure code for non-trivial widgets and their iframes.
