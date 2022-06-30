const { widget } = figma;
const { useEffect, Text } = widget;

// This widget will open an Iframe window with buttons to show a toast message and close the window.
function Widget() {
  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      if (msg.type === "show") {
        figma.notify("Hello widget");
      }
      if (msg.type === "close") {
        figma.closePlugin();
      }
    };
  });

  return (
    <Text
      fontSize={24}
      onClick={
        // Use async callbacks or return a promise to keep the Iframe window
        // opened. Resolving the promise, closing the Iframe window, or calling
        // "figma.closePlugin()" will terminate the code.
        () =>
          new Promise((resolve) => {
            figma.showUI(`
            <button id="show">Show Toast</button>
            <button id="close">Close Plugin</button>
            <script>
              document.getElementById("show").addEventListener("click", () => parent.postMessage({ pluginMessage: { type: "show" }}, '*'));
              document.getElementById("close").addEventListener("click", () => parent.postMessage({ pluginMessage: { type: "close" }}, '*'));
            </script>
            `);
          })
      }
    >
      Open IFrame
    </Text>
  );
}

widget.register(Widget);
