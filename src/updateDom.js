export function updateDom(dom, prevProps, nextProps) {
  Object.keys(prevProps).forEach((name) => {
    if (name !== "children" && !(name in nextProps)) {
      dom.removeAttribute(name);
    }
  });

  Object.keys(nextProps).forEach((name) => {
    if (name === "className") {
      dom.setAttribute("class", nextProps[name]);  // ✅ THIS LINE IS CRUCIAL
    } else if (name.startsWith("on")) {
      const event = name.toLowerCase().slice(2);
      dom.addEventListener(event, nextProps[name]);
    } else if (name !== "children") {
      dom.setAttribute(name, nextProps[name]);
    }
  });
}
