// ─────────────────────────────────────────────
//  PORTFOLIO CONFIGURATION — SIDHARTH SINGH RAWAT
//  Centralized data for ease of editing
// ─────────────────────────────────────────────

export const CONFIG = {
  name: "Sidharth Singh Rawat",
  initials: "SSR",
  eyebrow: "FULL-STACK DEVELOPER · CREATIVE BUILDER",
  headline: "I BUILD DIGITAL EXPERIENCES.",
  supportingText:
    "Full-stack developer crafting thoughtful, modern websites for businesses and ambitious ideas.",
  university: "B.Tech Student · Guru Gobind Singh Indraprastha University (IPU)",
  location: "New Delhi, India",
  email: "sidharthrawat684@gmail.com",
  linkedin: "https://www.linkedin.com/in/sidharth-singh-rawat-9546b4252/",
  phone: "+91 8595847041",
  github: "https://github.com/SidharthRawat10",
  availableForWork: true,

  about: {
    sectionNum: "01",
    tag: "ABOUT THE DEVELOPER",
    headline: "CURIOUS BY NATURE. BUILDER BY CHOICE.",
    paragraphs: [
      "I'm Sidharth Singh Rawat, a B.Tech student at IPU and a full-stack developer who enjoys turning ideas into useful, well-designed digital experiences.",
      "I build websites for clients, combining frontend design, interactive experiences, and backend functionality to create products that are practical, responsive, and enjoyable to use.",
      "I'm continuously improving my development skills, exploring new technologies, and building projects that challenge me to think beyond the ordinary.",
    ],
    highlights: [
      { label: "Role", value: "Full-Stack Web Developer" },
      { label: "Education", value: "B.Tech @ GGSIPU" },
      { label: "Specialty", value: "Modern Web Apps & Client Systems" },
      { label: "Focus", value: "Performant UI/UX & Resilient Backend" },
    ],
  },

  projects: [
    {
      id: "01",
      sectionNum: "CASE STUDY 01",
      title: "Shaadigram",
      badge: "LIVE CLIENT PROJECT",
      subtitle: "Cinematic Event Production & Instant Reels",
      category: "Full-Stack Multimedia Platform",
      year: "2024",
      description:
        "A modern multimedia agency platform engineered for instant event storytelling and cinematic reel curation. Features full-screen responsive video streaming, interactive showcase reels, and an instant booking funnel designed for luxury wedding clients.",
      tags: ["HTML5 / CSS3", "Modern JavaScript", "Video Streaming", "Lucide Icons", "Responsive UI"],
      highlights: [
        "Full-screen high-bitrate video background engine",
        "Curated wedding reel portfolio presentation",
        "Streamlined event booking & inquiry funnel",
        "100% responsive fluid mobile typography"
      ],
      url: "https://www.shaadigram.in/",
      previewTheme: {
        accent: "#d4af37",
        background: "#0d0e12",
        mockupBg: "#16181f"
      }
    },
    {
      id: "02",
      sectionNum: "CASE STUDY 02",
      title: "The Reputation 360",
      badge: "LIVE CLIENT PROJECT",
      subtitle: "Search Authority & Brand Protection Platform",
      category: "Enterprise Corporate Web Application",
      year: "2024",
      description:
        "A high-authority corporate web application for an international Online Reputation Management (ORM) agency. Features an interactive Google SERP suppression simulator, multi-step confidential consultation capture, and executive trust architecture.",
      tags: ["Next.js / React", "Tailwind CSS", "Interactive SERP Simulation", "Conversion Funnels", "Enterprise SEO"],
      highlights: [
        "Interactive Before/After Google SERP displacement demo",
        "Confidential multi-step consultation booking funnel",
        "Corporate trust metrics & structured schema data",
        "High-performance responsive editorial design"
      ],
      url: "https://www.thereputation360.com/",
      previewTheme: {
        accent: "#4caf50",
        background: "#0c1524",
        mockupBg: "#111f35"
      }
    },
  ],

  skills: {
    sectionNum: "03",
    tag: "TECHNICAL CAPABILITIES",
    headline: "ENGINEERED FOR MODERN STANDARDS.",
    description:
      "A pragmatic toolkit spanning responsive frontends, scalable backend services, and systems architecture.",
    categories: [
      {
        title: "Frontend Engineering",
        items: [
          { name: "HTML5", desc: "Semantic markup & accessible architecture" },
          { name: "CSS3", desc: "Modern layouts, Flexbox, Grid & animations" },
          { name: "JavaScript", desc: "ES6+, asynchronous flows & DOM manipulation" },
          { name: "React", desc: "Component architecture, hooks & state management" },
        ],
      },
      {
        title: "Backend Development",
        items: [
          { name: "Node.js", desc: "Asynchronous runtime & scalable microservices" },
          { name: "Express.js", desc: "RESTful APIs, routing & middleware pipelines" },
        ],
      },
      {
        title: "Database Systems",
        items: [
          { name: "MongoDB", desc: "NoSQL schema design, aggregation & indexing" },
        ],
      },
      {
        title: "Programming & Other Areas",
        items: [
          { name: "Java", desc: "Object-oriented software development & algorithms" },
          { name: "C++", desc: "Data structures, memory optimization & algorithmic problem solving" },
          { name: "AI / Machine Learning", desc: "Fundamental ML concepts & intelligent models" },
          { name: "Flutter", desc: "Cross-platform mobile application development" },
        ],
      },
    ],
  },

  contact: {
    sectionNum: "04",
    tag: "INITIATE CONTACT",
    headline: "HAVE AN IDEA?\nLET'S BUILD IT.",
    subtext:
      "I'm always interested in building thoughtful digital experiences, tackling ambitious client projects, and exploring interesting ideas.",
  },
};
