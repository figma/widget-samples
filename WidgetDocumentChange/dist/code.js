(() => {
  // widget-src/code.tsx
  var { widget } = figma;
  var { AutoLayout, Line, Text, useEffect, useSyncedState } = widget;
  var eventName = "nodechange";
  function Widget() {
    const [log, setLog] = useSyncedState("log", []);
    function onClose() {
      setLog([]);
    }
    function onDocumentChange(event) {
      const tmp = [
        ...event.nodeChanges.map((change) => `${change.origin} ${change.type} ${change.node.type} ${change.type === "PROPERTY_CHANGE" ? change.properties.join(", ") : ""}`),
        ...log
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
    return /* @__PURE__ */ figma.widget.h(AutoLayout, {
      direction: "vertical",
      height: "hug-contents",
      onClick: () => new Promise(() => {
        figma.showUI("", { visible: false });
      }),
      width: 400
    }, (log.length ? log : ["CLICK TO START"]).map((item, i) => /* @__PURE__ */ figma.widget.h(figma.widget.Fragment, null, i === 0 ? null : /* @__PURE__ */ figma.widget.h(Line, {
      length: 400,
      stroke: "#eee"
    }), /* @__PURE__ */ figma.widget.h(AutoLayout, {
      key: item,
      padding: 12,
      fill: "#FFFFFF",
      width: "fill-parent"
    }, /* @__PURE__ */ figma.widget.h(Text, {
      key: item,
      fontSize: 12
    }, item)))));
  }
  widget.register(Widget);
})();
