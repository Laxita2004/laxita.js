/** @jsx createElement */

import { createElement } from "./createElement.js";
import { render } from "./render.js";
import { useState } from "./hook.js";

console.log("JS running...");

function App() {
  const [items, setItems] = useState(["a", "b", "c"]);

  const shuffle = () => {
    setItems((prev) => [...prev].reverse());
  };

  return (
    <div>
      <button onClick={shuffle}>Reverse</button>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
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
  render(<App />, container);
};
