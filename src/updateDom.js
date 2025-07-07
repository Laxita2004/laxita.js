export function updateDom(dom, prevProps, nextProps) {
  // Remove old or changed event listeners
  Object.keys(prevProps).forEach(name => {
    if (isEvent(name)) {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    }
    // Remove old attributes
    if (!isEvent(name) && !(name in nextProps)) {
      dom.removeAttribute(name === "className" ? "class" : name);
    }
  });

  // Add new or changed props
  Object.keys(nextProps).forEach(name => {
    if (isEvent(name)) {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    } else if (name === "className") {
      dom.setAttribute("class", nextProps[name]); 
      console.log("Setting class:", nextProps[name])
    } else if (name !== "children") {
      dom.setAttribute(name, nextProps[name]);
    }
  });
}

function isEvent(prop) {
  return prop.startsWith("on");
}
