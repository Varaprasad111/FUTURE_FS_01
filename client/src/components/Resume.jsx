import React, { useState } from 'react';

export default function Resume() {
  const [activeTab, setActiveTab] = useState('experience');

  const resumeData = {
    experience: [
      { role: "Senior Frontend Engineer", company: "TechCorp", period: "2024 - Present", desc: "Led a team migrating legacy applications to React, improving core web vitals by 40%." },
      { role: "Full Stack Developer", company: "WebStudio", period: "2022 - 2024", desc: "Built end-to-end features using Node.js, Express, and MongoDB for e-commerce platforms." }
    ],
    education: [
      { btech: "Computer Science and engineering", institution: "Aditya University", period: "2024 - 2028", desc: "Specialized in Software Engineering and Database Systems." }
    ],
    skills: ["JavaScript (ES6+)", "React.js", "Node.js", "Express", "MongoDB", "MySQL", "REST APIs", "Git & GitHub", "CSS3 / HTML5"]
  };

  return (
    <div className="section-container">
      <h2 className="section-title">Interactive Resume</h2>
      <div className="resume-tabs">
        <button className={activeTab === 'experience' ? 'tab active' : 'tab'} onClick={() => setActiveTab('experience')}>Experience</button>
        <button className={activeTab === 'education' ? 'tab active' : 'tab'} onClick={() => setActiveTab('education')}>Education</button>
        <button className={activeTab === 'skills' ? 'tab active' : 'tab'} onClick={() => setActiveTab('skills')}>Skills</button>
      </div>

      <div className="resume-content">
        {activeTab !== 'skills' ? (
          resumeData[activeTab].map((item, idx) => (
            <div key={idx} className="resume-card">
              <h3>{item.role || item.degree}</h3>
              <h4>{item.company || item.institution} <span className="period">({item.period})</span></h4>
              <p>{item.desc}</p>
            </div>
          ))
        ) : (
          <div className="skills-grid">
            {resumeData.skills.map((skill, idx) => (
              <span key={idx} className="skill-badge">{skill}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}