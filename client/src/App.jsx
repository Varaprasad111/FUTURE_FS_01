import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <div className="app-container">
        {/* SEO Optimization */}
        <Helmet>
          <title>John Doe | Full Stack Developer Portfolio</title>
          <meta name="description" content="Welcome to my professional portfolio. Explore my software engineering projects, tech stack resume, and get in touch." />
          <meta name="keywords" content="Full Stack Developer, React, Node.js, MongoDB, Software Engineer, Portfolio" />
          <meta property="og:title" content="John Doe | Portfolio" />
          <meta property="og:description" content="Showcasing dynamic web applications and modern engineering skillsets." />
          <meta property="og:type" content="website" />
        </Helmet>

        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="logo">JD.dev</div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#resume">Resume</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        {/* Sections */}
        <main>
          <section id="about"><Hero /></section>
          <section id="resume"><Resume /></section>
          <section id="projects"><Projects /></section>
          <section id="contact"><Contact /></section>
        </main>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} John Doe. Built with React & Node.js.</p>
        </footer>
      </div>
    </HelmetProvider>
  );
}

export default App;