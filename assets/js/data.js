// assets/js/data.js

// 1. TV Project Data (Items displayed on the TV Screen)
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

// 2. Archive Data (Items displayed on the VHS Shelf)
const archives = [
    {
        label: "CSS ARTWORK",
        title: "Pure CSS Portrait",
        desc: "A drawing made entirely of divs and border-radius.",
        color: "#ff9999", // Soft Red
        links: [{ name: "Code", url: "#" }, { name: "Demo", url: "#" }]
    },
    {
        label: "THREE.JS CUBE",
        title: "3D Cube Spin",
        desc: "First attempt at WebGL lighting and materials.",
        color: "#a8ffab", // Phosphor Green
        links: [{ name: "Code", url: "#" }, { name: "Demo", url: "#" }]
    },
    {
        label: "REACT HOOKS",
        title: "Custom Hooks Lib",
        desc: "A collection of useful hooks for fetching data.",
        color: "#00ccff", // Cyber Blue
        links: [{ name: "Code", url: "#" }, { name: "NPM", url: "#" }]
    },
    {
        label: "GAME JAM 23",
        title: "Space Dodge",
        desc: "48hr game jam entry using Kaboom.js.",
        color: "#ffcc00", // Bright Yellow
        links: [{ name: "Code", url: "#" }, { name: "Play", url: "#" }]
    },
    {
        label: "API SCRAPER",
        title: "News Bot",
        desc: "Python script that aggregates headlines.",
        color: "#ff3333", // Alert Red
        links: [{ name: "Repo", url: "#" }]
    }
];