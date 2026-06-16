import React from 'react';

export default function Hero() {
  return (
    <div className="hero-section">
      <h1>Hi, I'm <span className="highlight">buddala vara prasad</span></h1>
      <h2>Full Stack Software Engineer</h2>
      <p>I build scalable web applications with smooth user experiences, powered by modern tech stacks.</p>
      <div className="hero-cta">
        <a href="#projects" className="btn primary-btn">View My Work</a>
        <a href="#contact" className="btn secondary-btn">Let's Talk</a>
      </div>
    </div>
  );
}