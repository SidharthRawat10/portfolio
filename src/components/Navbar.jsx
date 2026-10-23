import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { CONFIG } from '../config';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
          className="navbar-brand"
        >
          <span className="brand-name">{CONFIG.name.toUpperCase()}</span>
          <span className="brand-meta">FULL-STACK DEVELOPER</span>
        </a>

        {/* Live Status Pill */}
        <div className="navbar-status-pill">
          <span className="status-indicator-dot" />
          <span className="status-indicator-text">AVAILABLE FOR WORK</span>
        </div>

        {/* Navigation Links */}
        <nav className="navbar-nav">
          <button onClick={() => scrollToSection('about')} className="nav-item">
            <span className="nav-num">01</span>
            <span className="nav-title">ABOUT</span>
          </button>
          <button onClick={() => scrollToSection('work')} className="nav-item">
            <span className="nav-num">02</span>
            <span className="nav-title">WORK</span>
          </button>
          <button onClick={() => scrollToSection('skills')} className="nav-item">
            <span className="nav-num">03</span>
            <span className="nav-title">STACK</span>
          </button>
          <button onClick={() => scrollToSection('contact')} className="nav-item">
            <span className="nav-num">04</span>
            <span className="nav-title">CONTACT</span>
          </button>
        </nav>

        {/* CTA */}
        <div className="navbar-actions">
          <button 
            onClick={() => scrollToSection('contact')}
            className="navbar-cta-btn"
          >
            <span>LET'S CONNECT</span>
            <ArrowUpRight size={15} />
          </button>

          {/* Mobile hamburger */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <p className="mobile-drawer-tag">[ NAVIGATION ]</p>
          <div className="mobile-drawer-links">
            <button onClick={() => scrollToSection('about')} className="mobile-link">
              <span className="m-num">01</span>
              <span className="m-title">About Me</span>
            </button>
            <button onClick={() => scrollToSection('work')} className="mobile-link">
              <span className="m-num">02</span>
              <span className="m-title">Client Case Studies</span>
            </button>
            <button onClick={() => scrollToSection('skills')} className="mobile-link">
              <span className="m-num">03</span>
              <span className="m-title">Tech Stack</span>
            </button>
            <button onClick={() => scrollToSection('contact')} className="mobile-link">
              <span className="m-num">04</span>
              <span className="m-title">Contact & Inquiries</span>
            </button>
          </div>

          <div className="mobile-drawer-footer">
            <div className="mobile-status">
              <span className="status-indicator-dot" />
              <span>Available for Client Projects</span>
            </div>
            <button 
              onClick={() => scrollToSection('contact')}
              className="navbar-cta-btn mobile-cta"
            >
              <span>START A CONVERSATION</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
