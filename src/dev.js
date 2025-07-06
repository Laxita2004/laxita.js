export const DEV = true;

const renderCounts = {};

export function trackRender(name) {
  renderCounts[name] ??= 0;
  renderCounts[name]++;
  console.log(
    `%c[render] <${name}> rendered ${renderCounts[name]} time(s)`,
    "color: violet"
  );
}

export function logPropChanges(oldProps = {}, newProps = {}) {
  const changed = Object.entries(newProps).some(
    ([key, val]) => oldProps[key] !== val
  );

  console.log(
    `[props] Changed: ${changed}`,
    "\n→ Old:",
    oldProps,
    "\n→ New:",
    newProps
  );
}
