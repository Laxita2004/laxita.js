let rootContainer = null;

export function render(vnode, container) {
    rootContainer = container;
    const dom = createDom(vnode);
    container.innerHTML = ""; // clean before rendering
    container.appendChild(dom);
}

export function rerender(vnode) {
  if (rootContainer) {
    render(vnode, rootContainer);
  }
}

function createDom(vnode) {
    if(vnode.type === "TEXT_ELEMENT") {
        return document.createTextNode(vnode.props.nodeValue);
    }

    const dom = document.createElement(vnode.type);

    const isListener = name => name.startsWith("on");
    const isAttribute = name => name !== "children";

    Object.entries(vnode.props || {}).forEach(([name, value]) => {
        if(isListener(name)) {
            const eventType = name.toLowerCase().substring(2);
            dom.addEventListener(eventType, value);
        } else if(isAttribute(name)) {
            dom.setAttribute(name, value);
        }
    });

    (vnode.props.children || []).forEach(child => 
        dom.appendChild(createDom(child))
    );

    return dom;
}