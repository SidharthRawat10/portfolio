import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Globe, Shield, Video, Sparkles, CheckCircle2 } from 'lucide-react';
import { CONFIG } from '../config';

export default function Work() {
  const { projects } = CONFIG;
  const [serpView, setSerpView] = useState('after'); // for Reputation360 demo

  return (
    <section id="work" className="section work-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-label-header">
          <span className="section-index">02 //</span>
          <span className="section-tag-text">SELECTED WORK &amp; CLIENT CASE STUDIES</span>
        </div>

        <div className="work-intro-block">
          <h2 className="work-headline">
            PROVEN CLIENT <span className="text-stroke">PROJECTS</span>.
          </h2>
          <p className="work-subtext">
            Two production-deployed client websites built from scratch, demonstrating end-to-end full-stack development, performant UI/UX design, and verified business utility.
          </p>
        </div>

        {/* Project Case Studies Container */}
        <div className="case-studies-container">
          {/* ─────────────────────────────────────────────
              CASE STUDY 01: SHAADIGRAM
          ───────────────────────────────────────────── */}
          <article className="case-study-card shaadigram-card">
            {/* Header / Meta */}
            <div className="case-header">
              <div className="case-index-meta">
                <span className="case-num">CASE STUDY // 01</span>
                <span className="case-badge live">● LIVE DEPLOYMENT</span>
              </div>
              <div className="case-category-tag">MULTIMEDIA &amp; EVENT PRODUCTION</div>
            </div>

            {/* Split Grid */}
            <div className="case-body-grid">
              {/* Left Details */}
              <div className="case-info-panel">
                <div className="case-title-box">
                  <h3 className="case-title">{projects[0].title}</h3>
                  <p className="case-subtitle">{projects[0].subtitle}</p>
                </div>

                <p className="case-desc">{projects[0].description}</p>

                {/* Key Deliverables */}
                <div className="case-deliverables">
                  <p className="deliverables-title">[ ARCHITECTURAL HIGHLIGHTS ]</p>
                  <ul className="deliverables-list">
                    {projects[0].highlights.map((item, i) => (
                      <li key={i} className="deliverable-item">
                        <CheckCircle2 size={15} className="check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Tags */}
                <div className="case-tags-group">
                  {projects[0].tags.map((tag, i) => (
                    <span key={i} className="tech-tag">{tag}</span>
                  ))}
                </div>

                {/* Live Link Button */}
                <div className="case-actions">
                  <a
                    href={projects[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-live-btn interactive"
                  >
                    <span>VISIT LIVE WEBSITE</span>
                    <ArrowUpRight size={17} className="btn-arrow" />
                  </a>
                  <span className="live-url-display">shaadigram.in</span>
                </div>
              </div>

              {/* Right: Rich Interactive Browser Mockup */}
              <div className="case-preview-panel">
                <div className="browser-mockup shaadigram-mockup">
                  {/* Browser top chrome */}
                  <div className="browser-chrome">
                    <div className="chrome-dots">
                      <span className="dot red" />
                      <span className="dot yellow" />
                      <span className="dot green" />
                    </div>
                    <div className="chrome-address-bar">
                      <Globe size={12} className="address-icon" />
                      <span className="address-text">https://www.shaadigram.in/</span>
                      <span className="ssl-lock">SSL SECURED</span>
                    </div>
                  </div>

                  {/* Mockup Screen Viewport */}
                  <div className="mockup-screen shaadigram-screen">
                    <div className="screen-hero-preview">
                      <div className="preview-nav">
                        <span className="brand-logo">Shaadi <em>Gram</em></span>
                        <div className="preview-nav-links">
                          <span>Home</span>
                          <span>About</span>
                          <span>Reels</span>
                          <span>Testimonials</span>
                        </div>
                        <span className="preview-btn">Inquire Now</span>
                      </div>

                      <div className="preview-content">
                        <span className="sub-tag">Curation. Cinema. Celebration.</span>
                        <h4 className="preview-h1">Capturing Raw Emotions in Real-Time</h4>
                        <p className="preview-lead">
                          Cinematic reel creation and editing for weddings, birthdays, and celebrations. Memories instantly shared.
                        </p>
                        <div className="preview-cta-row">
                          <span className="mini-btn gold">Discover Our Story</span>
                          <span className="mini-btn glass">Plan Your Event</span>
                        </div>
                      </div>

                      {/* Video/Cinematic Card Overlay */}
                      <div className="mockup-floating-card">
                        <Video size={16} className="text-gold" />
                        <div>
                          <p className="card-micro-title">CINEMATIC 4K STREAMING</p>
                          <p className="card-micro-sub">Same-Day Edit &amp; Real-Time Reel Delivery</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>


          {/* ─────────────────────────────────────────────
              CASE STUDY 02: THE REPUTATION 360
          ───────────────────────────────────────────── */}
          <article className="case-study-card reputation-card">
            {/* Header / Meta */}
            <div className="case-header">
              <div className="case-index-meta">
                <span className="case-num">CASE STUDY // 02</span>
                <span className="case-badge live">● LIVE DEPLOYMENT</span>
              </div>
              <div className="case-category-tag">ENTERPRISE ORM &amp; BRAND PROTECTION</div>
            </div>

            {/* Split Grid */}
            <div className="case-body-grid">
              {/* Left Details */}
              <div className="case-info-panel">
                <div className="case-title-box">
                  <h3 className="case-title">{projects[1].title}</h3>
                  <p className="case-subtitle">{projects[1].subtitle}</p>
                </div>

                <p className="case-desc">{projects[1].description}</p>

                {/* Key Deliverables */}
                <div className="case-deliverables">
                  <p className="deliverables-title">[ ARCHITECTURAL HIGHLIGHTS ]</p>
                  <ul className="deliverables-list">
                    {projects[1].highlights.map((item, i) => (
                      <li key={i} className="deliverable-item">
                        <CheckCircle2 size={15} className="check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Tags */}
                <div className="case-tags-group">
                  {projects[1].tags.map((tag, i) => (
                    <span key={i} className="tech-tag">{tag}</span>
                  ))}
                </div>

                {/* Live Link Button */}
                <div className="case-actions">
                  <a
                    href={projects[1].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-live-btn interactive"
                  >
                    <span>VISIT LIVE WEBSITE</span>
                    <ArrowUpRight size={17} className="btn-arrow" />
                  </a>
                  <span className="live-url-display">thereputation360.com</span>
                </div>
              </div>

              {/* Right: Rich Interactive Browser Mockup with SERP Toggle */}
              <div className="case-preview-panel">
                <div className="browser-mockup reputation-mockup">
                  {/* Browser top chrome */}
                  <div className="browser-chrome">
                    <div className="chrome-dots">
                      <span className="dot red" />
                      <span className="dot yellow" />
                      <span className="dot green" />
                    </div>
                    <div className="chrome-address-bar">
                      <Globe size={12} className="address-icon" />
                      <span className="address-text">https://www.thereputation360.com/</span>
                      <span className="ssl-lock">SSL SECURED</span>
                    </div>
                  </div>

                  {/* Mockup Screen Viewport */}
                  <div className="mockup-screen reputation-screen">
                    <div className="screen-hero-preview orm-preview">
                      <div className="preview-nav orm-nav">
                        <span className="brand-logo orm-logo">Reputation<strong>360</strong></span>
                        <div className="preview-nav-links">
                          <span>Services</span>
                          <span>Who We Serve</span>
                          <span>Case Studies</span>
                        </div>
                        <span className="preview-btn green-btn">Free Scan</span>
                      </div>

                      <div className="orm-preview-content">
                        <div className="orm-left">
                          <h4 className="orm-h1">Take Control of Your Online Reputation</h4>
                          <p className="orm-lead">
                            Helping individuals and businesses suppress harmful results and rebuild trust.
                          </p>

                          {/* Stats counter */}
                          <div className="orm-stats-row">
                            <div className="orm-stat">
                              <span className="val">7+</span>
                              <span className="lbl">Years Exp</span>
                            </div>
                            <div className="orm-stat">
                              <span className="val">97%</span>
                              <span className="lbl">Success Rate</span>
                            </div>
                            <div className="orm-stat">
                              <span className="val">1,100+</span>
                              <span className="lbl">Clients</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Google SERP Suppression Simulator */}
                        <div className="orm-serp-simulator">
                          <div className="serp-sim-header">
                            <span className="sim-title">GOOGLE SERP SIMULATOR</span>
                            <div className="serp-toggle-pill">
                              <button
                                className={`pill-btn ${serpView === 'before' ? 'active' : ''}`}
                                onClick={() => setSerpView('before')}
                              >
                                Before
                              </button>
                              <button
                                className={`pill-btn ${serpView === 'after' ? 'active' : ''}`}
                                onClick={() => setSerpView('after')}
                              >
                                After ORM
                              </button>
                            </div>
                          </div>

                          <div className="serp-search-box">
                            <span className="search-query">jordan mercer founder</span>
                            <span className="google-tag">google.com</span>
                          </div>

                          <div className="serp-results-list">
                            {serpView === 'before' ? (
                              <>
                                <div className="serp-item negative">
                                  <span className="item-rank">01</span>
                                  <div className="item-text">
                                    <p className="item-title">Outdated Controversy &amp; False Claims Report</p>
                                    <p className="item-domain">unverified-blog.org</p>
                                  </div>
                                  <span className="item-flag red">Harmful</span>
                                </div>
                                <div className="serp-item neutral">
                                  <span className="item-rank">02</span>
                                  <div className="item-text">
                                    <p className="item-title">Jordan Mercer - Unclaimed Directory Profile</p>
                                    <p className="item-domain">public-records.net</p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="serp-item positive">
                                  <span className="item-rank">01</span>
                                  <div className="item-text">
                                    <p className="item-title">Jordan Mercer: Leadership, Ventures &amp; Keynotes</p>
                                    <p className="item-domain">jordanmercer.com/official</p>
                                  </div>
                                  <span className="item-flag green">Protected</span>
                                </div>
                                <div className="serp-item positive">
                                  <span className="item-rank">02</span>
                                  <div className="item-text">
                                    <p className="item-title">Executive Profile &amp; Forbes Council Feature</p>
                                    <p className="item-domain">forbes.com/leadership</p>
                                  </div>
                                  <span className="item-flag green">Authoritative</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Shield trust marker */}
                      <div className="mockup-floating-card orm-card">
                        <Shield size={16} className="text-green" />
                        <div>
                          <p className="card-micro-title">ENTERPRISE PRIVACY</p>
                          <p className="card-micro-sub">Compliant Negative Link Suppression</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
