import { resetHooks } from "./hook.js";
import { updateDom } from "./diff.js";

let rootContainer = null;
let rootVNode = null;

export function render(vnode, container) {
  rootContainer = container;
  rootVNode = vnode;
  resetHooks();

  const dom = createDom(vnode);
  container.innerHTML = ""; // clean before rendering
  container.appendChild(dom);
}

export function rerender() {
  if (rootContainer && rootVNode) {
    render(rootVNode, rootContainer);
  }
}

function reconcileChildren(parentDom, oldVChildren, newVChildren) {
  const keyedOld = {};
  const nonKeyedOld = [];

  oldVChildren.forEach((child, index) => {
    if (child.key != null) {
      keyedOld[child.key] = child;
    } else {
      nonKeyedOld.push({ child, index });
    }
  });

  let lastPlacedIndex = 0;

  newVChildren.forEach((newVNode, newIndex) => {
    const key = newVNode.key;
    let oldVNode;

    if (key != null && keyedOld[key]) {
      oldVNode = keyedOld[key];
      delete keyedOld[key];
    } else if (nonKeyedOld.length > 0) {
      oldVNode = nonKeyedOld.shift().child;
    }

    const newDom = createDom(newVNode);
    const oldDom = parentDom.childNodes[newIndex];

    if (oldDom) {
      parentDom.replaceChild(newDom, oldDom);
    } else {
      parentDom.appendChild(newDom);
    }
  });

  // Remove any extra old nodes
  while (parentDom.childNodes.length > newVChildren.length) {
    parentDom.removeChild(parentDom.lastChild);
  }
}

function createDom(vnode) {
  if (typeof vnode.type === "function") {
    const componentVNode = vnode.type(vnode.props || {});
    return createDom(componentVNode);
  }

  if (vnode.type === "TEXT_ELEMENT") {
    return document.createTextNode(vnode.props.nodeValue);
  }

  const dom = document.createElement(vnode.type);

  if (!vnode.oldProps) vnode.oldProps = {};
  updateDom(dom, vnode.oldProps, vnode.props);
  vnode.oldProps = vnode.props;

  const isListener = (name) => name.startsWith("on");
  const isAttribute = (name) => name !== "children";

  Object.entries(vnode.props || {}).forEach(([name, value]) => {
    if (isListener(name)) {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, value);
    } else if (isAttribute(name)) {
      dom.setAttribute(name, value);
    }
  });

  const oldChildren = vnode.oldProps?.children || [];

  reconcileChildren(dom, oldChildren, vnode.props.children || []);

  return dom;
}
