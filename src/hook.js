import { rerender } from "./render.js";

let hooks = [];
let currentHook = 0;

export function useState(initialValue) {
  const hookIndex = currentHook;

  hooks[hookIndex] = hooks[hookIndex] ?? initialValue;
console.log("useState hook", hookIndex, hooks[hookIndex]);

  const setState = (newValue) => {
  const valueToStore = typeof newValue === "function"
    ? newValue(hooks[hookIndex])
    : newValue;

  hooks[hookIndex] = valueToStore;
  rerender();
  console.log("Setting state at", hookIndex, "to", hooks[hookIndex]);

};

  currentHook++;

  return [hooks[hookIndex], setState];
}

export function resetHooks() {
    currentHook = 0;
}