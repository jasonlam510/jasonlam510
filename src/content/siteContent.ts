export const siteContent = {
  about: {
    body: {
      second: "What makes me:",
    },
    eyebrow: "About me",
    title:
      "I’m a passionate final-year Computer Science student at CityU. I started programming before university with Casio BASIC, Pascal, and VBA, and I’ve been building useful things ever since.",
    facts: [
      "CityU CS '26",
      "Exchange @ KTH '25",
      "Loves hacking and handcrafting almost everything",
      "Interested in multithreading and distributed systems",
      "Focusing on full-stack development currently",
    ],
  },
  contact: {
    emailLabel: "Email",
    eyebrow: "Contact",
    focusLabel: "Focus",
    focusValue:
      "Creative direction, frontend architecture, internationalized product interfaces, and cinematic data experiences.",
    title: "Available for ambitious brand worlds, premium tools, and immersive product surfaces.",
  },
  controls: {
    themeOptions: {
      dark: "Dark",
      light: "Light",
    },
    themeSwitch: {
      dark: "Switch to dark theme",
      light: "Switch to light theme",
    },
  },
  hero: {
    description: "I built this site with <3. Hover or drag across the sky to bring it to life.",
    eyebrow: "Lam Ching Hoi, Jason",
    meta: {
      location: "Hong Kong / Remote",
      role: "Full-stack developer",
      sourceHref: "https://github.com/jasonlam510/portfolio",
      sourceLabel: "Source code on GitHub",
    },
    title: "My portfolio",
  },
  workExperience: {
    eyebrow: "Work Experience",
    title: "Companies where I learned to build and ship:)",
    items: [
      {
        company: "Oursky Limited",
        description:
          "Worked on two full-stack projects: one as part of a team, and another built from scratch in a small setup with just the PM and me.",
        iconAlt: "Oursky logo",
        iconKey: "oursky",
        period: "Dec 2025 — Mar 2026",
        role: "Part-time Software Engineer",
        tags: ["Ruby on Rails", "PostgreSQL", "Redis", "Vite", "K8s", "GCP"],
      },
      {
        company: "Dating App Startup",
        description:
          "Took full ownership of the backend, designing and building the architecture from scratch.",
        emoji: "🚗",
        period: "Dec 2024 — Jan 2025",
        role: "Freelance Software Engineer",
        tags: ["FastAPI", "S3", "EC2", "Lambda", "RDS", "API Gateway"],
      },
      {
        company: "Hospital Authority",
        description:
          "I helped to build internal tools for my team",
        iconAlt: "Hospital Authority logo",
        iconKey: "hospitalAuthority",
        period: "Jul 2023 — Jul 2024",
        role: "Temporary Student Programmer",
        tags: ["Grafana", "InfluxDB", "Selenium"],
      },
    ],
  },
  projects: {
    cards: {
      designEngine: {
        description:
          "Reusable motion primitives, theme tokens, and polished surfaces tuned for premium product teams.",
        tag: "Frontend",
        title: "Design Engine",
      },
      executiveOs: {
        description:
          "An executive command surface organized for confidence, pace, and readability under pressure.",
        tag: "Product",
        title: "Executive OS",
      },
      hiddenZodiac: {
        description:
          "Constellations reveal themselves through spatial grouping, center-of-mass proximity, and lerped opacity states.",
        tag: "Portfolio",
        title: "Hidden Zodiac",
      },
      macroPulse: {
        description:
          "A market intelligence concept that treats narrative, macro signals, and motion pacing as one system.",
        tag: "Data Narrative",
        title: "Macro Pulse Terminal",
      },
      quantAtlas: {
        description:
          "A spatial exploration of exposure, volatility, and regime shifts expressed through editorial visualization.",
        tag: "Research",
        title: "Quant Atlas",
      },
      signalField: {
        description:
          "Particle repulsion, parallax drift, and HUD-style glow combined into a responsive interaction field.",
        tag: "Creative Code",
        title: "Signal Field",
      },
    },
    eyebrow: "Selected Projects",
    title: "Visual systems shaped for signal, atmosphere, and discovery.",
  },
} as const;
