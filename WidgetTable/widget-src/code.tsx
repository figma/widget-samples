const { widget } = figma
const { AutoLayout, Text, useSyncedMap, useEffect } = widget

const numRows = 3
const numCols = 3

function numToIndices(num: number): number[] {
  const ret = []
  for (let i = 0; i < num; i++) {
    ret.push(i)
  }
  return ret
}

function showEditorForCell(cellKey: string, cellContents: string) {
  figma.showUI(`
    <h3>Current Cell: ${cellKey}</h3>
    <pre id="editor" autofocus contenteditable=true>${cellContents}</pre>
      <button id="button">update</button>
      <script>
        const editor = document.getElementById("editor");
        const button = document.getElementById("button");
        editor.addEventListener("input", () => {
          parent.postMessage({
            pluginMessage: {
              contents: editor.innerText,
              cellKey: ${JSON.stringify(cellKey)}
            },
          }, '*');
        })
        editor.focus();
      </script>
  `)
}

function Table() {
  const cells = useSyncedMap<string>('cells')
  useEffect(() => {
    figma.ui.onmessage = ({ contents, cellKey }) => {
      cells.set(cellKey, contents)
    }
  })

  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height="hug-contents"
      padding={8}
      fill="#FFFFFF"
      spacing={12}
      stroke="#123456"
      cornerRadius={3}
    >
      {numToIndices(numRows).map((rowIdx) => {
        return (
          <AutoLayout
            key={rowIdx}
            direction="horizontal"
            horizontalAlignItems="start"
            verticalAlignItems="start"
            spacing={12}
          >
            {numToIndices(numCols).map((colIdx) => {
              const cellKey = `${rowIdx}-${colIdx}`
              const cellContents = cells.get(cellKey) || ''

              return (
                <AutoLayout
                  key={colIdx}
                  direction="vertical"
                  stroke="#123456"
                  fill="#ffffff"
                  cornerRadius={3}
                  onClick={() => {
                    showEditorForCell(cellKey, cellContents)
                    return new Promise<void>(() => {})
                  }}
                >
                  <AutoLayout direction="horizontal" padding={5}>
                    <Text fontSize={18} horizontalAlignText="center" width="fill-parent">
                      {cellContents || 'Click me to edit'}
                    </Text>
                  </AutoLayout>
                  <AutoLayout direction="horizontal" padding={1}>
                    <Text
                      fontSize={12}
                      horizontalAlignText="left"
                      width="fill-parent"
                      fill="#123456"
                    >
                      {rowIdx}x{colIdx}
                    </Text>
                  </AutoLayout>
                </AutoLayout>
              )
            })}
          </AutoLayout>
        )
      })}
    </AutoLayout>
  )
}
widget.register(Table)
