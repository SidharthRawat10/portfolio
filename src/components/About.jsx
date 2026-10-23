import React from 'react';
import { Terminal, Code, Cpu, Award } from 'lucide-react';
import { CONFIG } from '../config';

export default function About() {
  const { about } = CONFIG;

  return (
    <section id="about" className="section about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-label-header">
          <span className="section-index">{about.sectionNum} //</span>
          <span className="section-tag-text">{about.tag}</span>
        </div>

        {/* Editorial Headline */}
        <div className="about-headline-container">
          <h2 className="about-editorial-headline">
            {about.headline.split('\n').map((line, i) => (
              <span key={i} className="about-headline-line">{line}</span>
            ))}
          </h2>
        </div>

        {/* Two Column Editorial Grid */}
        <div className="about-grid">
          {/* Left Column: Personal Highlights & Credibility Cards */}
          <div className="about-left-col">
            <div className="about-bio-statement">
              <p className="statement-eyebrow">[ CORE PHILOSOPHY ]</p>
              <p className="statement-quote">
                "Code is simply the medium — the craft is in delivering systems that are robust, responsive, and a pleasure to navigate."
              </p>
            </div>

            <div className="about-specs-grid">
              {about.highlights.map((item, idx) => (
                <div key={idx} className="spec-item">
                  <span className="spec-label">{item.label}</span>
                  <span className="spec-value">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="about-terminal-card">
              <div className="terminal-header">
                <span className="terminal-dot red" />
                <span className="terminal-dot yellow" />
                <span className="terminal-dot green" />
                <span className="terminal-title">sidharth@ipu: ~/engineering</span>
              </div>
              <div className="terminal-body font-mono">
                <p className="term-line"><span className="term-prompt">&gt;</span> sidharth.status</p>
                <p className="term-output text-gold">"Building scalable full-stack applications"</p>
                <p className="term-line"><span className="term-prompt">&gt;</span> sidharth.approach</p>
                <p className="term-output">"User-centered UI + Resilient backend services"</p>
              </div>
            </div>
          </div>

          {/* Right Column: In-depth Paragraphs */}
          <div className="about-right-col">
            <div className="about-paragraphs">
              {about.paragraphs.map((p, index) => (
                <div key={index} className="about-paragraph-block">
                  <span className="p-num">0{index + 1}</span>
                  <p className="about-p-text">{p}</p>
                </div>
              ))}
            </div>

            {/* Practical Focus Badges */}
            <div className="about-badges-bar">
              <div className="pillar-badge">
                <Code size={16} className="pillar-icon" />
                <div>
                  <span className="pillar-title">Client-First Delivery</span>
                  <span className="pillar-sub">Real websites tailored to real business goals</span>
                </div>
              </div>
              <div className="pillar-badge">
                <Terminal size={16} className="pillar-icon" />
                <div>
                  <span className="pillar-title">Full-Stack Execution</span>
                  <span className="pillar-sub">From responsive frontends to database APIs</span>
                </div>
              </div>
              <div className="pillar-badge">
                <Cpu size={16} className="pillar-icon" />
                <div>
                  <span className="pillar-title">Continuous Growth</span>
                  <span className="pillar-sub">Refining algorithms, modern frameworks & systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
