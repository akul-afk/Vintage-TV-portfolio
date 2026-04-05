# Development Guide: Operator's Manual

Welcome to the **RetroTV Deployment & Development Unit**. This guide is designed for the portfolio operator (you) to maintain and expand the system.

## 🛠️ The Tech Stack

- **Core**: Vanilla HTML5, JavaScript (ES6+), CSS3.
- **Service**: [EmailJS](https://www.emailjs.com/) for contact signal transmission.
- **Icons**: [Font Awesome 6.x](https://fontawesome.com/).
- **Server**: Minimal Node.js `http` implementation.

## 📼 Adding New Content

Most content is managed in **[`assets/js/data.js`](./assets/js/data.js)**.

### Adding a Project (TV Channel)
Update the `projects` array:
```javascript
{
    title: "PROJECT_NAME",
    desc: "A short broadcast description of the mission.",
    tech: "[TECH-1] [TECH-2] [CORE-3]",
    link: "https://github.com/your-repo"
}
```

### Adding an Archive (VHS Tape)
Update the `archives` array:
```javascript
{
    label: "TAPE LABEL",
    title: "Project Title",
    desc: "A brief handwritten-style description.",
    color: "#your-hex-color", // The color of the label
    links: [{ name: "Code", url: "#" }, { name: "Demo", url: "#" }]
}
```

## 🖥️ Styling & Themes

### CSS Parallax
The parallax system is controlled via **[`assets/css/parallax.css`](./assets/css/parallax.css)**.
To add parallax to a new element, use the `data-parallax` and `data-speed` attributes:
```html
<div data-parallax data-speed="0.2">Kinetic Element</div>
```

### Theme Logic
Monochrome themes are defined in the `themes` object in `data.js`. Each theme defines CSS variable overrides for:
- `--bg-wall`: CRT background.
- `--text-main`: Phosphor glow.
- `--accent-glow`: High-intensity indicators.

## 📡 Signal Uplink (Contact Form)

The contact form uses **EmailJS**. Credentials are set in **[`assets/js/config.js`](./assets/js/config.js)**.
- **PUBLIC_KEY**: Your EmailJS public key.
- **SERVICE_ID**: Your email service ID.
- **TEMPLATE_ID**: Your contact form template ID.

---
*End of Protocol.*
