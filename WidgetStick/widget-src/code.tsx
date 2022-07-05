const { editorType, widget } = figma;
const { AutoLayout, Text, useStickable, useStickableHost, useSyncedState } =
  widget;

function Widget() {
  const [stickable, setStickable] = useSyncedState("stickable", true);
  if (stickable) {
    useStickable();
  } else {
    useStickableHost();
  }
  const text =
    editorType === "figma"
      ? "Stickable is not yet supported in Figma Design"
      : stickable
      ? "Stick me to things"
      : "Stick things to me";
  return (
    <AutoLayout
      fill={stickable ? "#000" : "#FFF"}
      hoverStyle={{ fill: stickable ? "#222" : "#EEE" }}
      onClick={() => setStickable(!stickable)}
      padding={stickable ? 32 : 128}
      stroke="#000"
      strokeWidth={2}
      tooltip="Click to toggle stickable/host"
    >
      <Text
        fill={stickable ? "#FFF" : "#000"}
        fontSize={32}
        hoverStyle={{ opacity: 0.8 }}
      >
        {text}
      </Text>
    </AutoLayout>
  );
}
widget.register(Widget);
