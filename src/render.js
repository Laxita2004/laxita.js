import { resetHooks, runAllCleanups } from "./hook.js";
import { updateDom } from "./diff.js";
import { Fragment } from "./createElement.js";

let rootContainer = null;
let rootVNode = null;

export function render(vnode, container) {
  rootContainer = container;
  rootVNode = vnode;
  runAllCleanups();
  resetHooks();

  const dom = createDom(vnode);
  container.innerHTML = ""; // clean before rendering
  container.appendChild(dom);

  console.log("Virtual DOM", JSON.stringify(vnode, null, 2));
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
    if (child?.key != null) {
      keyedOld[child.key] = child;
    } else {
      nonKeyedOld.push({ child, index });
    }
  });

  newVChildren.forEach((newVNode, newIndex) => {
    let oldVNode;

    if (newVNode.key != null && keyedOld[newVNode.key]) {
      oldVNode = keyedOld[newVNode.key];
    } else if (nonKeyedOld.length > 0) {
      oldVNode = nonKeyedOld.shift();
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

  if (vnode.type === Fragment) {
    const fragment = document.createDocumentFragment();

    (vnode.props.children || []).forEach((child) => {
      fragment.appendChild(createDom(child));
    });

    console.log("Rendering Fragment:", vnode.props.children);

    return fragment;
  }

  const dom = document.createElement(vnode.type);

  if (!vnode.oldProps) vnode.oldProps = {};
  updateDom(dom, vnode.oldProps, vnode.props);
  vnode.oldProps = vnode.props;

  const oldChildren = vnode.oldProps?.children || [];
  const newChildren = vnode.props?.children || [];

  reconcileChildren(dom, oldChildren, newChildren);

  return dom;
}
