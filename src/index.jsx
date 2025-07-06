/** @jsx createElement */
/** @jsxFrag Fragment */

import { createElement, Fragment } from "./createElement.js";
import { render } from "./render.js";
import { useState, useEffect, useMemo } from "./hook.js";
// import "./index.css";

console.log("JS running...");

function Title({ text }) {
  return <h1>{text}</h1>;
}

function ProfileCard({ name, tech }) {
  const upperName = useMemo(() => name.toUpperCase(), [name]);

  return (
    <Fragment>
      <h2>{upperName}</h2>
      <p>Skilled in: {tech.join(", ")}</p>
    </Fragment>
  );
}

function ProjectCard({ title, img }) {
  return (
    <div className="card">
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <LikeButton /> 
    </div>
  );
}

function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button className="like-btn" onClick={() => setLikes((l) => l + 1)}>
      ❤️ Like {likes}
    </button>
  );
}

function App() {
  const projects = [
    { title: "Adira Website", img: "./public/adira.png" },
    { title: "Book Review Website", img: "./public/writeaura.png" },
    { title: "Exam Office Website", img: "./public/exam-office.png" },
    { title: "Sandeep Masterbatches", img: "./public/smppl.png" },
    { title: "Narmada Guest House", img: "./public/guest-house.png" },
  ];

  return (
    <div id="portfolio" className="portfolio">
      <div className="intro">
        <h1>Hi, I'm Laxita 👩‍💻</h1>
        <p>Frontend Developer | Building the web, one pixel at a time</p>
      </div>

      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((proj) => (
          <ProjectCard key={proj.title} title={proj.title} img={proj.img} />
        ))}
      </div>

      
    </div>
  );
}


window.onload = () => {
  const container = document.getElementById("app");
  render(<App />, container);
};