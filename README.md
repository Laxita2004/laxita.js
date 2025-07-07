### ⚡ laxita.js — A Minimal React Clone from Scratch
laxita.js is a lightweight JavaScript library inspired by React. Built from scratch without React or any framework under the hood, it mimics core features like JSX rendering, components, virtual DOM diffing, and hooks like useState, useEffect, and useMemo.

This project showcases how a UI library works under the hood and is designed to demonstrate frontend expertise at the framework level

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
