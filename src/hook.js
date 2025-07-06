import { rerender } from "./render.js";
import { DEV } from "./dev.js";

let hooks = [];
let currentHook = 0;
let effectIndex = 0;
let prevDepsList = [];
let cleanupFns = [];

export function useState(initialValue) {
  const hookIndex = currentHook;

  hooks[hookIndex] = hooks[hookIndex] ?? initialValue;

  const setState = (newValue) => {
    const valueToStore =
      typeof newValue === "function" ? newValue(hooks[hookIndex]) : newValue;

    if (DEV) {
      console.log(`[useState] index ${hookIndex} →`, {
        oldValue: hooks[hookIndex],
        newValue: valueToStore,
      });
    }

    hooks[hookIndex] = valueToStore;
    rerender();
  };

  if (DEV) {
    console.log(`[hook] useState[${hookIndex}] →`, hooks[hookIndex]);
  }

  currentHook++;
  return [hooks[hookIndex], setState];
}

export function useEffect(effect, deps) {
  const hasNoDeps = !deps;
  const prevDeps = prevDepsList[effectIndex];
  const hasChanged =
    hasNoDeps || !prevDeps || deps.some((dep, i) => dep !== prevDeps[i]);

  if (hasChanged) {
    if (typeof cleanupFns[effectIndex] === "function") {
      if (DEV) console.log(`[useEffect] cleanup for effect[${effectIndex}]`);
      cleanupFns[effectIndex]();
    }

    const cleanup = effect();
    if (typeof cleanup === "function") {
      cleanupFns[effectIndex] = cleanup;
    }
    prevDepsList[effectIndex] = deps;

    if (DEV) {
      console.log(`[hook] useEffect[${effectIndex}] triggered → deps:`, deps);
    }
  }

  effectIndex++;
}

export function useMemo(callback, deps) {
  const hookIndex = currentHook;
  const oldHook = hooks[hookIndex];

  const hasChanged = !oldHook || !areDepsSame(oldHook.deps, deps);

  if (hasChanged) {
    const value = callback();
    hooks[hookIndex] = { value, deps };

    if (DEV) {
      console.log(`[hook] useMemo[${hookIndex}]: recomputed`);
    }
  } else if (DEV) {
    console.log(`[hook] useMemo[${hookIndex}]: reused cached value`);
  }

  const memoizedValue = hooks[hookIndex].value;

  currentHook++;
  return memoizedValue;
}

function areDepsSame(oldDeps = [], newDeps = []) {
  if (oldDeps.length !== newDeps.length) return false;
  for (let i = 0; i < oldDeps.length; i++) {
    if (oldDeps[i] !== newDeps[i]) return false;
  }
  return true;
}

export function resetHooks() {
  currentHook = 0;
  effectIndex = 0;
}

export function runAllCleanups() {
  cleanupFns.forEach((fn) => {
    if (typeof fn === "function") fn();
  });
  cleanupFns = [];
  prevDepsList = [];
}
