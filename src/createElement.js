export function createElement(type, props, ...children) {
    const normalizedChildren = children
    .flat()
    .filter(child => child !== null && child !== true && child !== false)
    .map(child => 
        typeof child === "object" ? child : createTextElement(child)
    );

    return {
        type,
        props: {
            ...props,
            children: normalizedChildren
        },
        key: props?.key
    };
}

function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    };
}