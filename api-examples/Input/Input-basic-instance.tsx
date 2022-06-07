const { widget } = figma;
const {
  useSyncedState,
  AutoLayout,
  Input, // Will have a red squiggly because it isn't defined in widget typings
} = widget;

function Widget() {
  const [text, setText] = useSyncedState("text", "");

  return (
    <Input
      value={text}
      placeholder={"Type name"}
      onTextEditEnd={(e: { characters: string }) => {
        console.log("text: ", e.characters);
        setText(e.characters);
      }}
      fontSize={64}
      fill={"#7f1d1d"}
      placeholderProps={{ opacity: 0.5 }}
      inputFrameProps={{
        fill: "#fee2e2",
        stroke: "#b91c1c",
        padding: 8,
        cornerRadius: 16,
      }}
    />
  );
}

widget.register(Widget);
