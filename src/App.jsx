import React, { useState, useEffect, useRef } from 'react';
import './styles/aksy.css';

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFlippedCard, setActiveFlippedCard] = useState(null);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [honking, setHonking] = useState(false);
  const heroRef = useRef(null);
  const boostRef = useRef(0);

  // Intro transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroDone(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // 3D Animated Car Running on the Yellow Ribbon Track
  useEffect(() => {
    const path = document.getElementById('ribbonPath');
    const car = document.getElementById('trackCar');
    const story = document.getElementById('story');
    const svg = document.getElementById('storyRibbonSvg');
    if (!path || !car || !story || !svg) return;

    let totalLen = 0;
    try {
      totalLen = path.getTotalLength();
    } catch {
      return;
    }
    if (!totalLen) return;

    let currentLen = 30;
    let targetLen = 30;
    let autoCruise = 0;
    let rafId;

    const handleScroll = () => {
      const rect = story.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrollRange = rect.height - windowH;
      if (scrollRange <= 0) return;
      // Calculate progress through story section
      const progress = Math.min(1, Math.max(0, -rect.top / scrollRange));
      targetLen = Math.max(15, Math.min(totalLen - 15, progress * totalLen));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const animate = () => {
      // Smooth lerp to scroll position
      const diff = targetLen - currentLen;
      currentLen += diff * 0.08 + boostRef.current;

      // Decay nitro boost
      if (boostRef.current > 0.1) {
        boostRef.current *= 0.92;
      } else {
        boostRef.current = 0;
      }

      // Small gentle cruise when resting
      if (Math.abs(diff) < 2 && boostRef.current === 0) {
        autoCruise = (autoCruise + 0.3) % totalLen;
      }

      const effectiveLen = Math.min(totalLen - 15, Math.max(10, currentLen));
      const pt = path.getPointAtLength(effectiveLen);
      const ptNext = path.getPointAtLength(Math.min(totalLen, effectiveLen + 4));

      const svgRect = svg.getBoundingClientRect();
      const scaleX = (svgRect.width || 1440) / 1440;
      const scaleY = (svgRect.height || 3200) / 3200;

      const dx = (ptNext.x - pt.x) * scaleX;
      const dy = (ptNext.y - pt.y) * scaleY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      car.setAttribute('transform', `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)}) rotate(${angle.toFixed(1)})`);

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleCarClick = (e) => {
    e.stopPropagation();
    boostRef.current = 22; // Nitro speed burst!
    setHonking(true);
    setTimeout(() => setHonking(false), 1400);
  };

  // 3D Mouse Parallax Tilt for Live Hero Character
  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x: x * 14, y: -y * 14 });
  };

  const handleHeroMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  // Scroll reveal observer for story beats
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.25 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [introDone]);

  // Services data for the 5-card fanned hand
  const services = [
    {
      rank: 'A',
      title: 'Full-Stack Web Apps',
      desc: 'Modern React, robust state management, responsive UI & end-to-end reliability.',
    },
    {
      rank: '2',
      title: 'Client Website Delivery',
      desc: 'High-converting, pixel-perfect websites built for real businesses & clients.',
    },
    {
      rank: '3',
      title: 'Backend & REST APIs',
      desc: 'Node.js, Express, MongoDB databases, secure endpoints & high throughput.',
    },
    {
      rank: '4',
      title: 'Interactive Motion UI',
      desc: 'Fluid micro-interactions, storytelling motion & buttery smooth 60fps animations.',
    },
    {
      rank: '5',
      title: 'Core CS & DSA',
      desc: 'Computer science foundation in Java & C++, algorithm design & clean architecture.',
    },
  ];

  const handleCardClick = (index) => {
    setActiveFlippedCard((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* 0. INTRO CURTAIN */}
      <div className={`intro ${introDone ? 'done' : ''}`} aria-hidden={introDone}>
        <div className="intro-badge">
          <div className="intro-circle">
            <img src="/sidharth-1.png" alt="Sidharth Singh Rawat" />
          </div>
          <div className="intro-text">hi, i'm sidharth.</div>
        </div>
      </div>

      {/* FLOATING PILL NAVBAR */}
      <header className="top">
        <div className="frame">
          <div className="bar">
            <a href="#hero" className="brand" aria-label="Sidharth Singh Rawat">
              <div className="logo-avatar">
                <img src="/sidharth-1.png" alt="Avatar" />
              </div>
              <span>sidharth.</span>
            </a>

            <nav className="nav" aria-label="Main Navigation">
              <a href="#story">story</a>
              <a href="#work">work</a>
              <a href="#tech">tech</a>
              <a href="#services">services</a>
              <a href="#contact">contact</a>
            </nav>

            <a
              className="pill"
              href="mailto:sidharthrawat684@gmail.com?subject=Let's%20build%20something%20together!"
            >
              work with me
              <svg className="arr" width="24" height="14" viewBox="0 0 48 28" aria-hidden="true">
                <path
                  d="M3 14 C18 11 28 17 42 14 M32 4 L44 14 L32 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <button
              className="menu-btn"
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {menuOpen && (
              <div className="menu-panel">
                <a href="#story" onClick={() => setMenuOpen(false)}>story</a>
                <a href="#work" onClick={() => setMenuOpen(false)}>work</a>
                <a href="#tech" onClick={() => setMenuOpen(false)}>tech</a>
                <a href="#services" onClick={() => setMenuOpen(false)}>services</a>
                <a href="#contact" onClick={() => setMenuOpen(false)}>contact</a>
                <a
                  href="mailto:sidharthrawat684@gmail.com?subject=Let's%20build%20something%20together!"
                  className="menu-work"
                  onClick={() => setMenuOpen(false)}
                >
                  work with me
                  <svg className="arr" width="24" height="14" viewBox="0 0 48 28">
                    <path
                      d="M3 14 C18 11 28 17 42 14 M32 4 L44 14 L32 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <div className="page" id="page">
        {/* STORY WRAPPER WITH BACKGROUND & HERO */}
        <div className="story" id="story">
          <div className="hero-bg"></div>
          <div className="sheet-bg"></div>

          {/* SVG RIBBON CONNECTING HERO TO PATH + 3D TRACK CAR RACER */}
          <svg
            id="storyRibbonSvg"
            className="story-ribbon rb"
            viewBox="0 0 1440 3200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="carHeadlightBeam" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#FAD105" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#FAD105" stopOpacity="0" />
              </linearGradient>
              <filter id="car3DShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="10" stdDeviation="6" floodColor="#462615" floodOpacity="0.32" />
              </filter>
            </defs>

            <path
              id="ribbonPath"
              className="base"
              d="M 280 400 Q 450 650 680 720 T 960 1100 Q 1150 1350 950 1600 T 420 2050 Q 200 2400 520 2750 T 820 3180"
              strokeWidth="58"
            />

            {/* 3D RACER CAR THAT RUNS ON THE YELLOW LINE */}
            <g
              id="trackCar"
              onClick={handleCarClick}
              style={{ filter: 'url(#car3DShadow)', cursor: 'pointer', pointerEvents: 'auto' }}
            >
              {/* Headlight beams lighting the track */}
              <polygon points="36,-9 140,-32 140,32 36,9" fill="url(#carHeadlightBeam)" />

              {/* Tires / Wheels (4 rubber tires with chrome accents) */}
              <rect x="15" y="-22" width="16" height="7" rx="3" fill="#1b120c" stroke="#462615" strokeWidth="1.5" />
              <circle cx="23" cy="-18.5" r="2.2" fill="#FAD105" />

              <rect x="15" y="15" width="16" height="7" rx="3" fill="#1b120c" stroke="#462615" strokeWidth="1.5" />
              <circle cx="23" cy="18.5" r="2.2" fill="#FAD105" />

              <rect x="-28" y="-22" width="16" height="7" rx="3" fill="#1b120c" stroke="#462615" strokeWidth="1.5" />
              <circle cx="-20" cy="-18.5" r="2.2" fill="#FAD105" />

              <rect x="-28" y="15" width="16" height="7" rx="3" fill="#1b120c" stroke="#462615" strokeWidth="1.5" />
              <circle cx="-20" cy="18.5" r="2.2" fill="#FAD105" />

              {/* Aerodynamic Sports Chassis */}
              <path
                d="M -33 -15 C -36 -15 -38 -8 -38 0 C -38 8 -36 15 -33 15 L 18 15 C 28 15 35 9 36 0 C 35 -9 28 -15 18 -15 Z"
                fill="#FFFFFF"
                stroke="#462615"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              {/* Sunshine Yellow & Dark Ink Racing Stripes */}
              <path d="M -37 -3 L 35 -3 L 35 3 L -37 3 Z" fill="#FAD105" />
              <path d="M -37 -1 L 35 -1 L 35 1 L -37 1 Z" fill="#462615" />

              {/* Hood scoop */}
              <path d="M 16 -6 L 24 -4 L 24 4 L 16 6 Z" fill="#462615" opacity="0.9" />

              {/* Cockpit & Glass Windshield */}
              <path
                d="M -13 -11 L 8 -10 C 14 -10 16 -6 17 0 C 16 6 14 10 8 10 L -13 11 C -16 11 -17 6 -17 0 C -17 -6 -16 -11 -13 -11 Z"
                fill="#2B180D"
                stroke="#462615"
                strokeWidth="2"
              />
              <path d="M -8 -8 L 5 -7 L 1 7 L -10 7 Z" fill="#FFFFFF" opacity="0.3" />

              {/* Driver Helmet */}
              <circle cx="-3" cy="0" r="5" fill="#FAD105" stroke="#462615" strokeWidth="1.5" />
              <rect x="-1" y="-3" width="4" height="6" rx="1.5" fill="#1b120c" />

              {/* Rear GT Wing / Spoiler */}
              <rect x="-37" y="-17" width="6" height="34" rx="2" fill="#FAD105" stroke="#462615" strokeWidth="2.5" />
              <rect x="-34" y="-8" width="3" height="16" fill="#462615" />

              {/* High-intensity Headlights */}
              <circle cx="34" cy="-7" r="3.5" fill="#FFFDE6" stroke="#462615" strokeWidth="1.5" />
              <circle cx="34" cy="7" r="3.5" fill="#FFFDE6" stroke="#462615" strokeWidth="1.5" />

              {/* Taillights */}
              <rect x="-38" y="-11" width="2.5" height="5" rx="1" fill="#EF4444" />
              <rect x="-38" y="6" width="2.5" height="5" rx="1" fill="#EF4444" />

              {/* Sidharth's Racing Number 10 */}
              <text
                x="6"
                y="3.5"
                fontSize="8"
                fontWeight="bold"
                fontFamily="'Plus Jakarta Sans', sans-serif"
                fill="#462615"
                textAnchor="middle"
              >
                10
              </text>

              {/* Animated Exhaust Flames */}
              <g className="car-exhaust">
                <circle cx="-42" cy="-4" r="3" fill="#FAD105" opacity="0.85" />
                <circle cx="-48" cy="-3" r="2.2" fill="#FF8C00" opacity="0.75" />
                <circle cx="-42" cy="4" r="3" fill="#FAD105" opacity="0.85" />
                <circle cx="-48" cy="3" r="2.2" fill="#FF8C00" opacity="0.75" />
              </g>

              {/* Honk Speech Tooltip */}
              {honking && (
                <g transform="translate(0, -32)">
                  <rect x="-48" y="-16" width="96" height="24" rx="12" fill="#FFFFFF" stroke="#462615" strokeWidth="2" />
                  <polygon points="-4,8 4,8 0,14" fill="#462615" />
                  <text
                    x="0"
                    y="1"
                    fontSize="13"
                    fontWeight="bold"
                    fontFamily="'Gaegu', cursive"
                    fill="#462615"
                    textAnchor="middle"
                  >
                    BEEP BEEP! 🏎️
                  </text>
                </g>
              )}
            </g>
          </svg>

          {/* 1. HERO SECTION (AUTHENTIC 3D LIVE PERSON - ZERO TEXT OVERLAP) */}
          <section
            className="hero"
            id="hero"
            aria-label="Introduction"
            ref={heroRef}
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
          >
            <div className="frame">
              <div className="hero-pic">
                <div
                  className="live-figure-stage"
                  style={{
                    transform: `perspective(1000px) rotateY(${mouseTilt.x}deg) rotateX(${mouseTilt.y}deg)`,
                  }}
                >
                  <div className="speech-bubble">
                    hey, i'm sidharth! 👋
                  </div>

                  {/* 3D Floating Props orbiting the figure */}
                  <div className="hero-prop prop-top-left" style={{ '--rot': '-8deg' }}>
                    ✦ Full-Stack
                  </div>
                  <div className="hero-prop prop-bottom-left" style={{ '--rot': '6deg' }}>
                    &lt;/&gt; React · Node
                  </div>

                  <img
                    className="live-person-img"
                    src="/sidharth-1.png"
                    alt="3D live Sidharth Singh Rawat"
                  />
                  <div className="ground-pedestal"></div>
                </div>

                <div className="live-status-pill">
                  <span className="dot"></span>
                  <span>Available for client projects · Delhi, IN</span>
                </div>
              </div>

              <div className="words">
                <div className="hero-eyebrow">
                  FULL-STACK DEVELOPER · CREATIVE BUILDER
                </div>
                <h1>hi, i'm sidharth.</h1>
                <p className="say">(say it rawat · b.tech cse @ ipu)</p>
                <p className="hero-bio">
                  I craft thoughtful, high-performance web applications and digital experiences for businesses, ambitious startups, and clients.
                </p>

                <div className="hero-actions">
                  <a href="#work" className="pill">
                    explore my work
                    <svg className="arr" width="24" height="14" viewBox="0 0 48 28">
                      <path
                        d="M3 14 C18 11 28 17 42 14 M32 4 L44 14 L32 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <a href="#contact" className="ghost">
                    let's connect
                  </a>
                </div>

                <div className="cue">
                  keep scrolling
                  <svg width="22" height="36" viewBox="0 0 28 48" aria-hidden="true">
                    <path
                      d="M14 3 C11 18 17 28 14 42 M4 32 L14 44 L24 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* 2. THE WINDING PATH / STORY BEATS (LIVE 3D PERSON - NO FRAMES) */}
          <section className="path" aria-label="My journey">
            {/* Beat 1: Left */}
            <div className="beat l">
              <div className="frame">
                <div className="pose reveal">
                  <div className="person-standalone">
                    <img src="/sidharth-1.png" alt="3D Sidharth building websites" />
                    <div className="person-shadow"></div>
                  </div>
                </div>
                <div className="card reveal">
                  <div className="prop-sticker">
                    <span style={{ fontSize: '36px' }}>🚀</span>
                  </div>
                  <p className="line">so i started building.</p>
                  <p className="note">
                    turning ambitious ideas into fast, high-performance client websites with clean, maintainable architecture.
                  </p>
                </div>
              </div>
            </div>

            {/* Beat 2: Right */}
            <div className="beat r">
              <div className="frame">
                <div className="pose reveal">
                  <div className="person-standalone">
                    <img src="/sidharth-2.png" alt="3D Sidharth developing backend" />
                    <div className="person-shadow"></div>
                  </div>
                </div>
                <div className="card reveal">
                  <div className="prop-sticker">
                    <span style={{ fontSize: '36px' }}>⚡</span>
                  </div>
                  <p className="line">taught myself to ship end-to-end.</p>
                  <p className="note">
                    from pixel-perfect responsive frontends & animations to scalable Node.js, Express & MongoDB database backends.
                  </p>
                </div>
              </div>
            </div>

            {/* Beat 3: Left */}
            <div className="beat l">
              <div className="frame">
                <div className="pose reveal">
                  <div className="person-standalone">
                    <img src="/sidharth-3.png" alt="3D Sidharth university & learning" />
                    <div className="person-shadow"></div>
                  </div>
                </div>
                <div className="card reveal">
                  <div className="prop-sticker">
                    <span style={{ fontSize: '36px' }}>💡</span>
                  </div>
                  <p className="line">curious about everything.</p>
                  <p className="note">
                    pursuing Computer Science B.Tech @ GGSIPU, exploring system design, modern web ecosystems, and creative motion.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* AFTER STORY: LEAD-IN, CLIENT PROJECTS, MARQUEE, SERVICES, FOOTER */}
        <div className="after">
          {/* LEAD-IN */}
          <section className="lead-in" aria-label="Lead in">
            <div className="frame">
              <p>
                and that builds a<span className="dots" aria-hidden="true"><i>.</i><i>.</i><i>.</i></span>
              </p>
            </div>
          </section>

          {/* 3D LIVE STAGE SHOWCASE */}
          <section className="photo-wrap" aria-label="3D Developer Showcase">
            <div className="frame">
              <div className="live-stage-3d">
                <svg className="stage-ribbon-back" viewBox="0 0 1000 500" preserveAspectRatio="none">
                  <path
                    d="M 50 420 Q 250 150 500 280 T 950 200"
                    fill="none"
                    stroke="var(--sun)"
                    strokeWidth="64"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="stage-figure">
                  <img src="/sidharth-2.png" alt="3D Sidharth Singh Rawat" />
                  <div className="person-shadow"></div>
                </div>

                <svg className="stage-ribbon-front" viewBox="0 0 1000 500" preserveAspectRatio="none">
                  <path
                    d="M 450 310 Q 600 450 820 380"
                    fill="none"
                    stroke="var(--sun)"
                    strokeWidth="64"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="stage-card-info">
                  <h4>full-stack engineering.</h4>
                  <p>
                    Every client project is built with care — optimized for speed, intuitive for users, and engineered to scale seamlessly across desktop and mobile.
                  </p>
                  <div className="pill-badge">
                    ✦ Production Ready · Client Approved
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. FEATURED CLIENT CASE STUDIES */}
          <section className="client-works" id="work" aria-label="Featured Client Work">
            <div className="frame">
              <h2>featured client projects</h2>
              <p className="sub">
                Real-world web applications designed and developed for clients, delivering measurable value and refined experiences.
              </p>

              <div className="projects-grid">
                {/* Project 1: Shaadigram */}
                <div className="project-card">
                  <div>
                    <div className="project-badge-top">
                      <span className="num">01 · Client Production</span>
                      <span className="client-live">● Live Website</span>
                    </div>
                    <h3>Shaadigram</h3>
                    <p className="desc">
                      An event & cinematic studio platform built to capture real-time wedding memories and social reels. Features fast multimedia loading, fluid mobile-first viewing, and streamlined client inquiry workflows.
                    </p>
                    <div className="project-tags">
                      <span>React</span>
                      <span>Responsive UI</span>
                      <span>Media Optimization</span>
                      <span>SEO</span>
                      <span>Client Delivery</span>
                    </div>
                  </div>

                  <div className="project-links">
                    <a
                      href="https://www.shaadigram.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill"
                    >
                      visit shaadigram.in
                      <svg className="arr" width="22" height="14" viewBox="0 0 48 28">
                        <path
                          d="M3 14 C18 11 28 17 42 14 M32 4 L44 14 L32 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Project 2: The Reputation 360 */}
                <div className="project-card">
                  <div>
                    <div className="project-badge-top">
                      <span className="num">02 · Client Production</span>
                      <span className="client-live">● Live Website</span>
                    </div>
                    <h3>The Reputation 360</h3>
                    <p className="desc">
                      A corporate digital presence for an executive Online Reputation Management (ORM) consultancy. Delivers high-trust authority messaging, search engine optimization, and corporate client consultation funnels.
                    </p>
                    <div className="project-tags">
                      <span>Full-Stack Web</span>
                      <span>ORM Architecture</span>
                      <span>Performance</span>
                      <span>Corporate UX</span>
                      <span>Live Client</span>
                    </div>
                  </div>

                  <div className="project-links">
                    <a
                      href="https://www.thereputation360.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill"
                    >
                      visit thereputation360.com
                      <svg className="arr" width="22" height="14" viewBox="0 0 48 28">
                        <path
                          d="M3 14 C18 11 28 17 42 14 M32 4 L44 14 L32 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. TECH STACK & MARQUEE */}
          <section className="brands" id="tech" aria-label="Technologies and Brands">
            <h2>technologies & brands i build with</h2>
            <div className="rows">
              {/* Row 1 */}
              <div className="row">
                <a href="https://www.shaadigram.in/" target="_blank" rel="noopener noreferrer" className="chip highlight">
                  ★ Shaadigram (Live)
                </a>
                <span className="chip">React 19</span>
                <span className="chip">Node.js</span>
                <a href="https://www.thereputation360.com/" target="_blank" rel="noopener noreferrer" className="chip highlight">
                  ★ The Reputation 360
                </a>
                <span className="chip">MongoDB</span>
                <span className="chip">Express.js</span>
                <span className="chip">GGSIPU CSE</span>
                <span className="chip blank">+ always learning</span>
                {/* Duplicate for infinite loop */}
                <a href="https://www.shaadigram.in/" target="_blank" rel="noopener noreferrer" className="chip highlight">
                  ★ Shaadigram (Live)
                </a>
                <span className="chip">React 19</span>
                <span className="chip">Node.js</span>
                <a href="https://www.thereputation360.com/" target="_blank" rel="noopener noreferrer" className="chip highlight">
                  ★ The Reputation 360
                </a>
                <span className="chip">MongoDB</span>
                <span className="chip">Express.js</span>
                <span className="chip">GGSIPU CSE</span>
                <span className="chip blank">+ always learning</span>
              </div>

              {/* Row 2: Reverse */}
              <div className="row rev">
                <span className="chip">JavaScript / TypeScript</span>
                <span className="chip">Tailwind CSS</span>
                <span className="chip">RESTful APIs</span>
                <span className="chip">GSAP & Micro-Interactions</span>
                <span className="chip">Java & Algorithms</span>
                <span className="chip">C++ Systems</span>
                <span className="chip">Flutter Apps</span>
                <span className="chip">AI & LLM Workflows</span>
                {/* Duplicate for infinite loop */}
                <span className="chip">JavaScript / TypeScript</span>
                <span className="chip">Tailwind CSS</span>
                <span className="chip">RESTful APIs</span>
                <span className="chip">GSAP & Micro-Interactions</span>
                <span className="chip">Java & Algorithms</span>
                <span className="chip">C++ Systems</span>
                <span className="chip">Flutter Apps</span>
                <span className="chip">AI & LLM Workflows</span>
              </div>
            </div>
          </section>

          {/* 5. SERVICES: FANNED PLAYING CARDS */}
          <section className="services" id="services" aria-label="Services">
            <div className="frame">
              <h2>what i can build for you</h2>
              <p className="hint">
                <span className="hov">(hover or click a card to flip)</span>
                <span className="tap">(tap a card to flip)</span>
              </p>

              <div className="hand can-hover">
                {services.map((svc, index) => {
                  const offset = (index - (services.length - 1) / 2).toFixed(2);
                  const isFlipped = activeFlippedCard === index;

                  return (
                    <button
                      key={svc.title}
                      type="button"
                      className={`svc ${isFlipped ? 'flip' : ''}`}
                      style={{ '--o': offset }}
                      onClick={() => handleCardClick(index)}
                      aria-label={svc.title}
                    >
                      <span className="svc-in">
                        {/* Card Back */}
                        <span className="side back">
                          <span className="card-back-mark">SSR</span>
                        </span>

                        {/* Card Face */}
                        <span className="side face" aria-hidden="true">
                          <span className="idx tl">
                            {svc.rank}
                            <i></i>
                          </span>
                          <span className="name">{svc.title}</span>
                          <span className="subtext">{svc.desc}</span>
                          <span className="idx br">
                            {svc.rank}
                            <i></i>
                          </span>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 6. MASSIVE YELLOW FOOTER */}
          <div className="foot-wrap" id="contact">
            <div className="frame">
              <footer className="foot">
                <div className="frame">
                  <div className="foot-top">
                    <div>
                      <p className="pitch">
                        got an ambitious idea that needs to move? i build fast, modern websites for businesses and clients.
                      </p>
                      <a
                        href="mailto:sidharthrawat684@gmail.com?subject=Project%20Inquiry%20from%20Portfolio"
                        className="go"
                      >
                        work with me
                        <span className="dot">
                          <svg width="24" height="14" viewBox="0 0 48 28">
                            <path
                              d="M3 14 C18 11 28 17 42 14 M32 4 L44 14 L32 24"
                              fill="none"
                              stroke="var(--ink)"
                              strokeWidth="5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </a>
                    </div>

                    <div className="cols">
                      <ul>
                        <li>
                          <a
                            href="https://www.linkedin.com/in/sidharth-singh-rawat-9546b4252/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            linkedin ↗
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://github.com/SidharthRawat10"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            github ↗
                          </a>
                        </li>
                        <li>
                          <a href="mailto:sidharthrawat684@gmail.com">
                            sidharthrawat684@gmail.com ↗
                          </a>
                        </li>
                        <li>
                          <a href="tel:+918595847041">
                            call: +91 8595847041 ↗
                          </a>
                        </li>
                        <li>
                          <a href="https://wa.me/918595847041" target="_blank" rel="noopener noreferrer">
                            whatsapp me ↗
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="foot-mid">
                    <div>
                      <h2>let's make something.</h2>
                      <svg className="squig" viewBox="0 0 560 36" aria-hidden="true">
                        <path
                          d="M6 18 Q 40 4 70 18 T 134 18 T 198 18 T 262 18 T 326 18 T 390 18 T 454 18 T 518 18 T 554 16"
                          fill="none"
                          stroke="var(--ink)"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <div className="where">
                      <div>
                        <h3>direct line & email</h3>
                        <p>
                          <a href="tel:+918595847041">+91 8595847041</a>
                          <br />
                          <a href="mailto:sidharthrawat684@gmail.com">sidharthrawat684@gmail.com</a>
                        </p>
                      </div>
                      <div>
                        <h3>home base & education</h3>
                        <p>
                          New Delhi, India
                          <br />
                          B.Tech CSE · Guru Gobind Singh Indraprastha University (GGSIPU)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="foot-bot">
                    <span>© 2026 Sidharth Singh Rawat</span>
                    <span className="made">made with clean code, curiosity & a lot of sunshine yellow</span>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
