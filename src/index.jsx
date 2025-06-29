/** @jsx createElement */

import { createElement } from "./createElement";

const tree = (
    <div id="root">
        <h1>Hello from laxita.js</h1>
        <p>This is a <strong>custom</strong> framework</p>
    </div>
);

console.log(JSON.stringify(tree, null, 2));