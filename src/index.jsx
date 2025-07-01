/** @jsx createElement */

import { createElement } from "./createElement.js";
import { render } from "./render.js";

console.log("JS running...");

const tree = (
    <div id="root" className="main">
        <h1>Hello from laxita.js</h1>
        <p>This is a <strong>custom</strong> frontend framework</p>
    </div>
);

// console.log(JSON.stringify(tree, null, 2));
const container = document.getElementById("app");
console.log("container:", container);
render(tree, container);