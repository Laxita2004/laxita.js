export function createElement(type, props, ...children) {
    const normalizedChildren = children
    .flat()
    .filter(child => child !== null && child !== true && child !== false)
    .map(child => 
        typeof child === "object" ? child : createTextElement(child)
    );

    const finalVNode = {
    type,
    props: {
      ...props,
      children: normalizedChildren,
    },
    key: props?.key,
  };

  // Dev logging
  if (window.laxitaDevtools) {
    console.log("[createElement]", typeof type === "function" ? type.name : type, finalVNode);
  }

  return finalVNode;
}

export const Fragment = Symbol("Fragment");

function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    };
}