import React, { useState } from 'react';

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const projectList = [
    { title: "E-Commerce System", category: "Fullstack", tech: "React, Node.js, MongoDB", desc: "A comprehensive shopping site featuring fully integrated payment gateways." },
    { title: "AI Image Dashboard", category: "Frontend", tech: "React, Tailwind CSS", desc: "An interactive dashboard communicating cleanly with AI generation OpenAPIs." },
    { title: "Secure Authentication API", category: "Backend", tech: "Node.js, JWT, Redis", desc: "Microservice infrastructure handling robust user registration and JWT state tracking." }
  ];

  const filteredProjects = filter === 'All' ? projectList : projectList.filter(p => p.category === filter);

  return (
    <div className="section-container">
      <h2 className="section-title">Featured Projects</h2>
      <div className="filter-buttons">
        {['All', 'Frontend', 'Backend', 'Fullstack'].map(cat => (
          <button key={cat} className={filter === cat ? 'filter-btn active' : 'filter-btn'} onClick={() => setFilter(cat)}>{cat}</button>
        ))}
      </div>
      <div className="projects-grid">
        {filteredProjects.map((proj, idx) => (
          <div key={idx} className="project-card">
            <h3>{proj.title}</h3>
            <span className="category-tag">{proj.category}</span>
            <p>{proj.desc}</p>
            <p className="tech-stack"><strong>Tech:</strong> {proj.tech}</p>
          </div>
        ))}
      </div>
    </div>
  );
}