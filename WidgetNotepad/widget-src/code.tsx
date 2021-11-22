const { widget } = figma
const { AutoLayout, Text, useSyncedState, usePropertyMenu, useEffect } = widget

function Notepad() {
  const [text, setText] = useSyncedState('text', 'Hello\nWidgets')
  usePropertyMenu(
    [
      {
        tooltip: 'Edit',
        propertyName: 'edit',
        itemType: 'action',
      },
    ],
    ({ propertyName }) => {
      if (propertyName === 'edit') {
        figma.showUI(`
        <pre id="editor" contenteditable=true>${text}</pre>
        <button id="button">update</button>
        <script>
          const editor = document.getElementById("editor");
          const button = document.getElementById("button");
          editor.addEventListener("input", () => {
            parent.postMessage({ pluginMessage: editor.innerText }, '*');
          })
          editor.focus();
        </script>
      `)
        return new Promise<void>(() => {})
      }
    },
  )

  useEffect(() => {
    figma.ui.onmessage = (message) => {
      setText(message)
    }
  })

  return (
    <AutoLayout
      direction="horizontal"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height="hug-contents"
      padding={8}
      fill="#FFFFFF"
      spacing={12}
      effect={{
        type: 'drop-shadow',
        color: { r: 0, g: 0, b: 0, a: 0.2 },
        offset: { x: 0, y: 0 },
        blur: 2,
        spread: 2,
      }}
    >
      <AutoLayout direction="vertical" horizontalAlignItems="start" verticalAlignItems="start">
        {text.split('\n').map((line, idx) => {
          return line ? (
            <Text key={idx} fontSize={12} horizontalAlignText="left" width="fill-parent">
              {line}
            </Text>
          ) : null
        })}
      </AutoLayout>
    </AutoLayout>
  )
}
widget.register(Notepad)
