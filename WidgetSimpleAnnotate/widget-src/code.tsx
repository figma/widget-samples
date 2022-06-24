const { widget } = figma;
const { Frame, Input, Rectangle, Text, useSyncedState, usePropertyMenu } =
  widget;

type Color =
  | "#3366ff"
  | "#9933ff"
  | "#ff33cc"
  | "#ff3333"
  | "#ffcc33"
  | "#99ff33"
  | "#33ff66"
  | "#33ffff";

const fills: Color[] = [
  "#3366ff",
  "#9933ff",
  "#ff33cc",
  "#ff3333",
  "#ffcc33",
  "#99ff33",
  "#33ff66",
  "#33ffff",
];

const textColors: { [k in Color]: string } = {
  "#3366ff": "#ffffff",
  "#9933ff": "#ffffff",
  "#ff33cc": "#ffffff",
  "#ff3333": "#ffffff",
  "#ffcc33": "#000000",
  "#99ff33": "#000000",
  "#33ff66": "#000000",
  "#33ffff": "#000000",
};

function Widget() {
  const [text, setText] = useSyncedState("text", "");
  const [open, setOpen] = useSyncedState("open", true);
  const [color, setColor] = useSyncedState<Color>("color", fills[0]);
  const [size, setSize] = useSyncedState("size", 50);
  const [mode, setMode] = useSyncedState("mode", false);
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
              { option: "25", label: "Extra Small" },
              { option: "50", label: "Small" },
              { option: "75", label: "Medium" },
              { option: "125", label: "Large" },
              { option: "200", label: "Extra Large" },
              { option: "300", label: "Huge" },
            ],
            selectedOption: size.toString(),
            tooltip: "Size",
            propertyName: "size",
          },
          {
            itemType: "action",
            tooltip: "Mode",
            propertyName: "mode",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
            <circle cx="32" cy="32" r="12" fill="${
              mode ? color : "#FFF"
            }" stroke="${color}" stroke-width="6" />
            </svg>`,
          },
        ]
      : [],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "color" && propertyValue) {
        setColor(propertyValue as Color);
      } else if (propertyName === "size" && propertyValue) {
        setSize(Number(propertyValue));
      } else if (propertyName === "mode") {
        setMode(!mode);
      }
    }
  );

  const fontSize = size * 0.32;
  const padding = size * 0.4;
  const strokeWidth = size * 0.1;
  const width: WidgetJSX.Size = size * 8;

  const cornerRadius: WidgetJSX.CornerRadius = {
    topLeft: size,
    topRight: size,
    bottomLeft: size,
    bottomRight: open ? strokeWidth : size,
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
        fontSize={fontSize}
        fontWeight="normal"
        fill={mode ? textColors[color] : "#000"}
        inputFrameProps={{
          cornerRadius: strokeWidth,
          effect: shadow,
          fill: mode ? color : "#FFF",
          hidden: !open,
          horizontalAlignItems: "center",
          overflow: "visible",
          padding,
          stroke: color,
          strokeWidth,
          verticalAlignItems: "center",
        }}
        onTextEditEnd={(e) => setText(e.characters.trim())}
        placeholder="Your annotation here..."
        value={text}
        width={width}
        x={size}
        y={size}
      />
      <Rectangle
        cornerRadius={cornerRadius}
        effect={shadow}
        fill={mode ? "#000" : "#FFF"}
        height={size}
        width={size}
      />
      <Rectangle
        cornerRadius={cornerRadius}
        fill={color}
        height={size}
        hoverStyle={{ opacity: 0.7 }}
        onClick={() => setOpen(!open)}
        width={size}
      />
    </Frame>
  );
}

widget.register(Widget);
