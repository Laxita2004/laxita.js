### ⚡ laxita.js — A Minimal React-like Frontend Framework from Scratch with Dev-First Debugging Support
**laxita.js** is a lightweight JavaScript UI library built entirely from scratch — without using React or any third-party frameworks. It replicates the core architecture of React, including **JSX rendering**, **component system**, **virtual DOM diffing**, and **custom hooks** like `useState`, `useEffect`, and `useMemo`.

What sets laxita.js apart is its **focus on solving a real frontend pain point**:
> I found that **debugging render logic in complex UIs often relies on scattered `console.log()` statements**, making it hard to track re-renders, prop changes, and lifecycle events effectively.

To solve this, I introduced a **dev-only logging layer (`dev.js`)** that provides structured console logs for:
* When a component mounts, unmounts, or re-renders
* What props changed between renders (with diff info)
* When effects run and clean up
* State updates in components

This project not only demonstrates deep frontend understanding but also improves developer experience by offering clear, contextual console insights during development.

✅ **Key Features**:
* JSX transpilation via Babel plugin (no React dependency)
* Virtual DOM + diffing algorithm for efficient updates
* Custom component model with hooks
* Built-in dev logger for enhanced debugging
* Tiny, fast, and readable codebase for learning & demonstration

🎯 **Purpose**:
To understand and showcase how modern UI frameworks like React work under the hood — and to go a step further by solving the everyday DX issues developers face while debugging.

---

It supports things like:
- JSX (with createElement and Fragment)
- Components
- useState, useEffect, useMemo
- Virtual DOM and re-rendering
- Developer logs using dev.js

## 📁 Files Overview
- index.jsx – main app (portfolio page) - for testing
- createElement.js – handles JSX
- render.js – creates and updates DOM
- hook.js – handles state and effects
- dev.js – logs component renders and prop changes
- style.css – simple styling
- index.html – basic HTML wrapper

## 🔧 How to Run
- Clone the project
- Compile the JSX:
`npx babel src/index.jsx --out-file dist/index.js`
- Open index.html in browser (Live Server works great)
