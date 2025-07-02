import { rerender } from "./render";

let hooks = [];
let currentHook = 0;

export function useState(initialValue) {
    const hookIndex = currentHook;

    hooks[hookIndex] = hooks[hookIndex] ?? initialValue;

    const setState = newValue => {
        hooks[hookIndex] = newValue;
        rerender();
    };

    currentHook++;

    return [hooks[hookIndex], setState];
}

export function resetHooks() {
    currentHook = 0;
}