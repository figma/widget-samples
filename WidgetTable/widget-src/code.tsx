const { widget } = figma;
const { AutoLayout, Input, Text, useSyncedMap } = widget;

const numRows = 3;
const numCols = 3;

function numToIndices(num: number): number[] {
  return new Array(num).fill(0).map((_, i) => i);
}

function Table() {
  const cells = useSyncedMap<string>("cells");

  return (
    <AutoLayout
      cornerRadius={3}
      direction="vertical"
      fill="#FFFFFF"
      height="hug-contents"
      horizontalAlignItems="center"
      padding={8}
      spacing={12}
      stroke="#000"
      verticalAlignItems="center"
    >
      {numToIndices(numRows).map((rowIdx) => (
        <AutoLayout
          key={rowIdx}
          direction="horizontal"
          horizontalAlignItems="start"
          spacing={12}
          verticalAlignItems="start"
        >
          {numToIndices(numCols).map((colIdx) => {
            const cellKey = `${rowIdx}-${colIdx}`;
            const cellContents = cells.get(cellKey) || "";

            return (
              <AutoLayout
                key={colIdx}
                cornerRadius={3}
                direction="vertical"
                fill="#fff"
                stroke="#000"
              >
                <Input
                  inputFrameProps={{ padding: 5 }}
                  onTextEditEnd={(e) => cells.set(cellKey, e.characters)}
                  placeholder="Edit me..."
                  value={cellContents}
                />
                <AutoLayout
                  direction="horizontal"
                  padding={{ bottom: 5, left: 5, right: 5 }}
                >
                  <Text
                    fontSize={12}
                    horizontalAlignText="left"
                    fill="#123456"
                    lineHeight={12}
                    width="fill-parent"
                  >
                    {rowIdx}x{colIdx}
                  </Text>
                </AutoLayout>
              </AutoLayout>
            );
          })}
        </AutoLayout>
      ))}
    </AutoLayout>
  );
}
widget.register(Table);
