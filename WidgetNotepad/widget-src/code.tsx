const { widget } = figma;
const { Input, useSyncedState } = widget;

function Notepad() {
  const [text, setText] = useSyncedState("text", "Hello\nWidgets");

  return (
    <Input
      inputFrameProps={{
        effect: {
          type: "drop-shadow",
          color: { r: 0, g: 0, b: 0, a: 0.2 },
          offset: { x: 0, y: 0 },
          blur: 2,
          spread: 2,
        },
        fill: "#FFFFFF",
        horizontalAlignItems: "center",
        padding: 8,
        verticalAlignItems: "center",
      }}
      fill="#000"
      fontSize={12}
      height="hug-contents"
      horizontalAlignText="left"
      onTextEditEnd={(e) => setText(e.characters)}
      value={text}
      width="fill-parent"
    />
  );
}
widget.register(Notepad);
