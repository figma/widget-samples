(() => {
  // widget-src/code.tsx
  var { widget } = figma;
  var { AutoLayout, Line, Text, useEffect, useSyncedState } = widget;
  function Widget() {
    const [log, setLog] = useSyncedState("log", []);
    function onClose() {
      setLog([]);
    }
    function documentChangeAsString(change) {
      const { origin, type } = change;
      const list = [origin, type];
      if (type === "PROPERTY_CHANGE") {
        list.push(change.node.type);
        list.push(change.properties.join(", "));
      } else if (type === "STYLE_CHANGE") {
        list.push(change.style.name);
        list.push(change.properties.join(", "));
      } else {
        list.push(change.node.type);
      }
      return list.join(" ");
    }
    function onDocumentChange(event) {
      const tmp = [
        ...event.documentChanges.map(documentChangeAsString),
        ...log
      ];
      tmp.splice(Math.min(50, tmp.length), tmp.length);
      setLog(tmp);
    }
    useEffect(() => {
      figma.on("close", onClose);
      figma.on("documentchange", onDocumentChange);
      return function cleanup() {
        figma.off("close", onClose);
        figma.off("documentchange", onDocumentChange);
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
      fontSize: 12
    }, item)))));
  }
  widget.register(Widget);
})();
