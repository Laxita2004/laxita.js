/** @jsx createElement */

import { createElement } from "./createElement.js";
import { render, rerender } from "./render.js";

let count = 0;

function handleClick() {
  count++;
  rerender(App());
}

console.log("JS running...");

function App() {
  return (
    <div>
      <h1 onClick={handleClick}>Click me</h1>
      <p>You've clicked {count} times</p>
    </div>
  );
}

// const tree = (
//     <div id="root" className="main">
//         <h1>Hello from laxita.js</h1>
//         <p>This is a <strong>custom</strong> frontend framework</p>
//         <button onClick={handleClick}>Click Me</button>
//     </div>
// );

// console.log(JSON.stringify(tree, null, 2));
// const container = document.getElementById("app");
// console.log("container:", container);
// render(tree, container);

window.onload = () => {
  const container = document.getElementById("app");
  render(App(), container);
};
