/** @jsx createElement */
/** @jsxFrag Fragment */

import { createElement, Fragment } from "./createElement.js";
import { render } from "./render.js";
import { useState, useEffect, useMemo } from "./hook.js";

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

function ProjectCard({ title, img, link }) {
  return (
    <div className="card">
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <a className="project-link" href={link} target="_blank">🔗 GitHub</a>
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

function Skills() {
  const skills = ["HTML", "CSS", "JavaScript", "React", "Next.js", "Node.js", "MongoDB", "PostgreSQL"];
  return (
    <div className="skills">
      <h2>Skills</h2>
      <ul>
        {skills.map(skill => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

function Connect() {
  return (
    <div className="connect">
      <h2>Connect with Me</h2>
      <ul>
        <li><a href="https://github.com/your-username" target="_blank">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/your-profile" target="_blank">LinkedIn</a></li>
        <li><a href="https://leetcode.com/your-username" target="_blank">LeetCode</a></li>
        <li><a href="mailto:youremail@example.com">Email</a></li>
      </ul>
    </div>
  );
}

function App() {
  const projects = [
    {
      title: "Adira Website",
      img: "./public/adira.png",
      link: "https://github.com/Laxita2004/adira-website"
    },
    {
      title: "Book Review Website",
      img: "./public/writeaura.png",
      link: "https://github.com/Laxita2004/WriteAura"
    },
    {
      title: "Exam Office Website",
      img: "./public/exam-office.png",
      link: "https://github.com/Dipesh1203/exam_office_website"
    },
    {
      title: "Sandeep Masterbatches",
      img: "./public/smppl.png",
      link: "https://github.com/Laxita2004/Sandeep-Masterbatches-Polyblends-Pvt.-Ltd."
    },
    {
      title: "Narmada Guest House",
      img: "./public/guest-house.png",
      link: "https://github.com/Laxita2004/guest-house-booking-gsits"
    },
  ];

  return (
    <div id="portfolio" className="portfolio">
      <div className="intro">
        <h1>Hi, I'm Laxita 👩‍💻</h1>
        <p>Frontend Developer | Building the web, one pixel at a time</p>
      </div>

      <Skills />

      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((proj) => (
          <ProjectCard key={proj.title} title={proj.title} img={proj.img} link={proj.link} />
        ))}
      </div>

      <Connect />
    </div>
  );
}

window.onload = () => {
  const container = document.getElementById("app");
  render(<App />, container);
};