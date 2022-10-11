const { widget } = figma;
const { AutoLayout, Text, useEffect, useSyncedState } = widget;

const eventName = "nodechange"; // eventually, "documentchange"

function Widget() {
  const [log, setLog] = useSyncedState<string[]>("log", []);

  function onClose() {
    setLog([]);
  }
  function onDocumentChange(event: NodeChangeEvent) {
    const tmp: string[] = [
      ...event.nodeChanges.map(
        (change) =>
          `${change.origin} ${change.type} ${change.node.type} ${
            change.type === "PROPERTY_CHANGE"
              ? change.properties.join(", ")
              : ""
          }`
      ),
      ...log,
    ];
    tmp.splice(Math.min(10, tmp.length), tmp.length);
    setLog(tmp);
  }

  useEffect(() => {
    figma.on("close", onClose);
    figma.on(eventName, onDocumentChange);
    return function cleanup() {
      figma.off("close", onClose);
      figma.off(eventName, onDocumentChange);
    };
  });

  return (
    <AutoLayout
      direction="vertical"
      height="hug-contents"
      padding={8}
      fill="#FFFFFF"
      onClick={() =>
        new Promise(() => {
          figma.showUI("", { visible: false });
        })
      }
      spacing={12}
      width={400}
    >
      {(log.length ? log : ["CLICK TO START"]).map((item) => (
        <Text key={item} fontSize={12}>
          {item}
        </Text>
      ))}
    </AutoLayout>
  );
}
widget.register(Widget);
