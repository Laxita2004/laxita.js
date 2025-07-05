export function updateDom(dom, prevProps, nextProps) {
  const isListener = (name) => name.startsWith("on");
  const isAttribute = (name) => name !== "children" && !isListener(name);

  // Remove old props
  Object.keys(prevProps).forEach((name) => {
    if (isListener(name)) {
      const event = name.toLowerCase().substring(2);
      dom.removeEventListener(event, prevProps[name]);
    } else if (isAttribute(name)) {
      dom.removeAttribute(name);
    }
  });

  // Add or update new props
  Object.entries(nextProps).forEach(([name, value]) => {
    if (isListener(name)) {
      const event = name.toLowerCase().substring(2);
      dom.addEventListener(event, value);
    } else if (isAttribute(name)) {
      dom.setAttribute(name, value);
    }
  });
}