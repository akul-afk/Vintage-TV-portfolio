
// 1. TV Project Data 
const projects = [
    {
        title: "NEON_RIDER",
        desc: "An endless runner game featuring procedural generation and synthwave aesthetics.",
        tech: "[JS] [CANVAS] [AUDIO API]",
        link: "#"
    },
    {
        title: "AI_QUIZ_GEN",
        desc: "A Flask-based application utilizing spaCy and the Gemini API to generate MCQs from text automatically.",
        tech: "[PYTHON] [NLP] [FLASK]",
        link: "#"
    },
    {
        title: "NEWS_SCRAPER",
        desc: "A web scraping tool for news headlines built with BeautifulSoup4 and integrated with Power BI for insights.",
        tech: "[PYTHON] [BS4] [POWER BI]",
        link: "#"
    }
];

// 2. Archive Data 
const archives = [
    {
        label: "CSS ARTWORK",
        title: "Pure CSS Portrait",
        desc: "A drawing made entirely of divs and border-radius.",
        color: "#ff9999",
        links: [{ name: "Code", url: "#" }, { name: "Demo", url: "#" }]
    },
    {
        label: "THREE.JS CUBE",
        title: "3D Cube Spin",
        desc: "First attempt at WebGL lighting and materials.",
        color: "#a8ffab",
        links: [{ name: "Code", url: "#" }, { name: "Demo", url: "#" }]
    },
    {
        label: "REACT HOOKS",
        title: "Custom Hooks Lib",
        desc: "A collection of useful hooks for fetching data.",
        color: "#00ccff",
        links: [{ name: "Code", url: "#" }, { name: "NPM", url: "#" }]
    },
    {
        label: "GAME JAM 23",
        title: "Space Dodge",
        desc: "48hr game jam entry using Kaboom.js.",
        color: "#ffcc00", 
        links: [{ name: "Code", url: "#" }, { name: "Play", url: "#" }]
    },
    {
        label: "API SCRAPER",
        title: "News Bot",
        desc: "Python script that aggregates headlines.",
        color: "#ff3333",
        links: [{ name: "Repo", url: "#" }]
    }
];

// 3. Social Media Uplinks
const socials = [
    {
        platform: "GITHUB",
        icon: "fa-brands fa-github",
        url: "https://github.com/yourusername",
        color: "#f0f6fc" // Off-white
    },
    {
        platform: "LINKEDIN",
        icon: "fa-brands fa-linkedin",
        url: "https://linkedin.com/in/yourusername",
        color: "#0077b5" // LinkedIn Blue
    },
    {
        platform: "TWITTER",
        icon: "fa-brands fa-x-twitter",
        url: "https://twitter.com/yourusername",
        color: "#1DA1F2"
    }
];

// 4. Theme Configurations
const themes = {
    phosphor: {
        label: "PHOSPHOR_GREEN",
        colors: {
            "--bg-wall": "#0a0a0a",
            "--text-main": "#00ff41",
            "--accent-glow": "#00ff41",
            "--nav-text": "#fff",
            "--form-bg": "#111",
            "--uplink-glow": "0 0 10px var(--accent-glow)",
            "--crt-opacity": "0.1"
        }
    },
    amber: {
        label: "VINTAGE_AMBER",
        colors: {
            "--bg-wall": "#1a1510",
            "--text-main": "#ffb000",
            "--accent-glow": "#ffb000",
            "--nav-text": "#fff",
            "--form-bg": "#111",
            "--uplink-glow": "0 0 10px var(--accent-glow)",
            "--crt-opacity": "0.15"
        }
    }
};

// 5. Skill Specifications

const techStack = [
    {
        id: "FRONTEND_MODULE",
        techs: ["React", "Next.js", "Tailwind", "WebGL"],
        leds: ["green", "green", "yellow"]
    },
    {
        id: "BACKEND_CORE",
        techs: ["Node.js", "Python", "PostgreSQL", "Redis"],
        leds: ["green", "red"]
    },
    {
        id: "DEVOPS_UNIT",
        techs: ["Docker", "AWS", "CI/CD"],
        leds: ["green", "green"]
    }
];