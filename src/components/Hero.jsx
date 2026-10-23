import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Compass, Layers } from 'lucide-react';
import { CONFIG } from '../config';

const CHARACTER_ANGLES = [
  { id: 0, src: '/sidharth-1.jpg', label: 'PERSPECTIVE 01' },
  { id: 1, src: '/sidharth-2.jpg', label: 'PERSPECTIVE 02' },
  { id: 2, src: '/sidharth-3.jpg', label: 'PERSPECTIVE 03' },
];

export default function Hero() {
  const [activeAngle, setActiveAngle] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Subtle interactive parallax based on mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMouseOffset({ x: x * 16, y: y * 12 });

      // Automatically switch subtle angle based on horizontal cursor quadrant
      const normalizedX = (e.clientX - rect.left) / rect.width;
      if (normalizedX < 0.35) {
        setActiveAngle(0);
      } else if (normalizedX > 0.65) {
        setActiveAngle(2);
      } else {
        setActiveAngle(1);
      }
    };

    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      {/* Background Architectural Grid Lines & Coordinates */}
      <div className="hero-grid-bg" aria-hidden="true">
        <div className="grid-line horizontal top" />
        <div className="grid-line horizontal bottom" />
        <div className="grid-line vertical left" />
        <div className="grid-line vertical center" />
        <div className="grid-line vertical right" />
        <div className="corner-tag top-left">REF: 28.6139° N, 77.2090° E // DELHI</div>
        <div className="corner-tag top-right">GGSIPU · B.TECH CSE</div>
      </div>

      <div className="container hero-container">
        {/* Left Editorial Text Column */}
        <div className="hero-editorial-col">
          <div className="hero-eyebrow-wrapper">
            <span className="eyebrow-pill">PORTFOLIO EDITION 2024–2026</span>
            <p className="hero-eyebrow-text">{CONFIG.eyebrow}</p>
          </div>

          <div className="hero-title-block">
            <h1 className="hero-massive-headline">
              <span className="headline-line">I BUILD</span>
              <span className="headline-line accent-gradient">DIGITAL</span>
              <span className="headline-line outline-text">EXPERIENCES.</span>
            </h1>
          </div>

          <div className="hero-identity-card">
            <div className="identity-marker" />
            <div className="identity-info">
              <p className="hero-name-callout">{CONFIG.name}</p>
              <p className="hero-university-sub">{CONFIG.university}</p>
            </div>
          </div>

          <p className="hero-subheadline-desc">{CONFIG.supportingText}</p>

          <div className="hero-ctas-group">
            <button 
              onClick={() => scrollToSection('work')} 
              className="cta-btn primary-cta interactive"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowDown size={16} className="btn-icon" />
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="cta-btn secondary-cta interactive"
            >
              <span>LET'S CONNECT</span>
              <ArrowUpRight size={16} className="btn-icon" />
            </button>
          </div>

          {/* Quick status bar */}
          <div className="hero-availability-footer">
            <div className="status-ping-box">
              <span className="status-ping-dot" />
              <span className="status-ping-text">OPEN FOR CLIENT COMMISSIONS</span>
            </div>
            <div className="location-box">
              <Compass size={13} />
              <span>NEW DELHI, INDIA</span>
            </div>
          </div>
        </div>

        {/* Right Character Stage Column */}
        <div className="hero-character-col">
          {/* Subtle background monogram */}
          <div className="character-monogram" aria-hidden="true">
            <span>SSR</span>
          </div>

          {/* Character Stage Wrapper */}
          <div 
            className="character-stage"
            style={{
              transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
            }}
          >
            {/* The Character Image Renders */}
            <div className="character-render-container">
              {CHARACTER_ANGLES.map((angle) => (
                <img
                  key={angle.id}
                  src={angle.src}
                  alt={`Sidharth Singh Rawat - ${angle.label}`}
                  className={`character-silhouette ${activeAngle === angle.id ? 'active' : ''}`}
                  loading="eager"
                />
              ))}

              {/* Shadow Base Grounding */}
              <div className="character-ground-shadow" aria-hidden="true" />
            </div>

            {/* Floating Editorial Badges */}
            <div className="character-badge top-badge">
              <span className="badge-tag">CLIENT ARCHITECTURE</span>
              <span className="badge-desc">FULL-STACK SPECIALIST</span>
            </div>

            <div className="character-badge bottom-badge">
              <span className="badge-tag">STATUS</span>
              <span className="badge-desc">PRODUCTION-READY</span>
            </div>

            {/* Interactive Angle Switcher */}
            <div className="character-angle-controller">
              <div className="controller-header">
                <Layers size={12} />
                <span>INTERACTIVE VIEW</span>
              </div>
              <div className="angle-buttons">
                {CHARACTER_ANGLES.map((angle) => (
                  <button
                    key={angle.id}
                    className={`angle-btn ${activeAngle === angle.id ? 'active' : ''} interactive`}
                    onClick={() => setActiveAngle(angle.id)}
                    aria-label={`Switch to ${angle.label}`}
                  >
                    <span>0{angle.id + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Scroll Cue */}
      <div 
        className="hero-scroll-cue interactive" 
        onClick={() => scrollToSection('about')}
        role="button"
        tabIndex={0}
      >
        <span className="cue-label">SCROLL TO DISCOVER</span>
        <div className="cue-indicator">
          <div className="cue-runner" />
        </div>
      </div>
    </section>
  );
}
