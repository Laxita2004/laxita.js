/** @jsx createElement */

import { createElement } from "./createElement.js";
import { render } from "./render.js";
import { useState, useEffect } from "./hook.js";

console.log("JS running...");
window.laxitaDevtools = true;

function Welcome(props) {
  return <h2>👋 Hello, {props.name}!</h2>;
}

function App() {
  return (
    <div>
      <h1>Welcome to laxita.js</h1>
      <Welcome name="Laxita" />
      <Welcome name="Arjun" />
    </div>
  );
}

window.onload = () => {
  const container = document.getElementById("app");
  render(<App />, container);
};
// function Counter() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     console.log("Starting interval");

//     const id = setInterval(() => {
//       setCount((c) => c + 1);
//     }, 1000);

//     return () => {
//       console.log("🧹 Clearing interval");
//       clearInterval(id);
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Counter: {count}</h2>
//     </div>
//   );
// }

// window.onload = () => {
//   const container = document.getElementById("app");
//   render(<Counter />, container);
// };