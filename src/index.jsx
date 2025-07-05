/** @jsx createElement */

import { createElement } from "./createElement.js";
import { render } from "./render.js";
import { useState, useEffect } from "./hook.js";

console.log("JS running...");

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("⏱ Starting interval");

    const id = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    return () => {
      console.log("🧹 Clearing interval");
      clearInterval(id);
    };
  }, []);

  return (
    <div>
      <h2>Counter: {count}</h2>
    </div>
  );
}

window.onload = () => {
  const container = document.getElementById("app");
  render(<Counter />, container);
};