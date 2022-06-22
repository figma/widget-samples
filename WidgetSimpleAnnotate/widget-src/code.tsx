const { widget } = figma;
const { Frame, Input, Rectangle, Text, useSyncedState, usePropertyMenu } =
  widget;

const fills = [
  "#ff3333",
  "#ffcc33",
  "#99ff33",
  "#33ff66",
  "#33ffff",
  "#3366ff",
  "#9933ff",
  "#ff33cc",
];

function Widget() {
  const [text, setText] = useSyncedState("text", "");
  const [open, setOpen] = useSyncedState("open", true);
  const [color, setColor] = useSyncedState("color", fills[0]);
  const [size, setSize] = useSyncedState("size", 50);
  usePropertyMenu(
    open
      ? [
          {
            itemType: "color-selector",
            options: fills.map((a) => ({ tooltip: a, option: a })),
            selectedOption: color,
            tooltip: "Color",
            propertyName: "color",
          },
          {
            itemType: "dropdown",
            options: [
              { option: "25", label: "SM" },
              { option: "50", label: "MD" },
              { option: "100", label: "LG" },
            ],
            selectedOption: size.toString(),
            tooltip: "Size",
            propertyName: "size",
          },
        ]
      : [],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "color" && propertyValue) {
        setColor(propertyValue);
      } else if (propertyName === "size" && propertyValue) {
        setSize(Number(propertyValue));
      }
    }
  );

  const cornerRadius: WidgetJSX.CornerRadius = {
    topLeft: size,
    topRight: size,
    bottomLeft: size,
    bottomRight: open ? 5 : size,
  };

  const shadow: WidgetJSX.Effect = {
    type: "drop-shadow",
    color: "#00000040",
    offset: { x: 0, y: 5 },
    blur: 15,
    showShadowBehindNode: false,
  };

  return (
    <Frame name="Widget" overflow="visible" width={size} height={size}>
      <Input
        fontWeight="normal"
        inputFrameProps={{
          cornerRadius: 5,
          effect: shadow,
          fill: "#FFF",
          hidden: !open,
          horizontalAlignItems: "center",
          overflow: "visible",
          padding: 20,
          stroke: color,
          strokeWidth: 5,
          verticalAlignItems: "center",
        }}
        onTextEditEnd={(e) => {
          setText(e.characters.trim());
          setOpen(false);
        }}
        placeholder="Your annotation here..."
        value={text}
        width={400}
        x={size}
        y={size}
      />
      <Rectangle
        cornerRadius={cornerRadius}
        effect={shadow}
        fill={"#FFF"}
        height={size}
        width={size}
      />
      <Rectangle
        cornerRadius={cornerRadius}
        fill={color}
        height={size}
        hoverStyle={{ opacity: 0.5 }}
        onClick={() => setOpen(!open)}
        width={size}
      />
    </Frame>
  );
}

widget.register(Widget);
