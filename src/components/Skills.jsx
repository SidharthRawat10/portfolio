import React, { useState } from 'react';
import { Layers, Server, Database, Cpu, Terminal, ArrowRight, Sparkles } from 'lucide-react';
import { CONFIG } from '../config';

const CATEGORY_ICONS = {
  "Frontend Engineering": Layers,
  "Backend Development": Server,
  "Database Systems": Database,
  "Programming & Other Areas": Cpu,
};

export default function Skills() {
  const { skills } = CONFIG;
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-label-header">
          <span className="section-index">{skills.sectionNum} //</span>
          <span className="section-tag-text">{skills.tag}</span>
        </div>

        {/* Intro */}
        <div className="skills-header-block">
          <h2 className="skills-headline">
            {skills.headline}
          </h2>
          <p className="skills-lead-desc">{skills.description}</p>
        </div>

        {/* Skills Categorized Grid */}
        <div className="skills-categories-grid">
          {skills.categories.map((cat, idx) => {
            const Icon = CATEGORY_ICONS[cat.title] || Terminal;
            return (
              <div 
                key={idx} 
                className={`skill-category-card ${activeCategory === idx ? 'focused' : ''} interactive`}
                onMouseEnter={() => setActiveCategory(idx)}
              >
                <div className="cat-card-header">
                  <div className="cat-icon-box">
                    <Icon size={18} />
                  </div>
                  <div className="cat-title-wrap">
                    <span className="cat-num">0{idx + 1}</span>
                    <h3 className="cat-name">{cat.title}</h3>
                  </div>
                </div>

                <div className="cat-items-list">
                  {cat.items.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-item-row">
                      <div className="skill-main-info">
                        <span className="skill-bullet" />
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <p className="skill-desc-text">{skill.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="cat-card-footer">
                  <span className="footer-count">{cat.items.length} TECHNOLOGIES</span>
                  <div className="footer-line" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Engineering Principles Banner */}
        <div className="skills-quote-strip">
          <div className="strip-left">
            <Sparkles size={16} className="text-gold" />
            <span className="strip-label">ARCHITECTURE PRINCIPLE</span>
          </div>
          <p className="strip-text">
            "Tools and frameworks change; core problem solving, algorithmic rigor, clean code structure, and empathy for user latency remain timeless."
          </p>
        </div>
      </div>
    </section>
  );
}
