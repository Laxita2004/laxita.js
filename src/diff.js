export function updateDom(dom, prevProps, nextProps) {
    // remove old props
    Object.keys(prevProps).forEach(name => {
        if(name === "children") return;
        if(!(name in nextProps)) {
            dom.removeAttribute(name);
        }
    });

    // set changed props
    Object.entries(nextProps).forEach(([name, value]) => {
        if(name === "children") return;
        dom.setAttribute(name, value);
    });
}