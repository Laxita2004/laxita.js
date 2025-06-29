/** @jsx createElement */

function createElement(type, props, ...children) {
    return { type, props: props || {}, children };
}

const tree = (
    <div id="root">
        <h1>Hello from laxita.js</h1>
        <p>This is a test JSX</p>
    </div>
);

console.log(JSON.stringify(tree, null, 2));