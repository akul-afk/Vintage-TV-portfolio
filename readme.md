# RetroTV Portfolio: The Analog Broadcast

A premium, immersive portfolio experience built with modern technologies and a vintage soul. This project simulates a 1980s analog television and hardware rack to showcase web development projects and technical skills.

![CRT Display](https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop)

## 📺 Key Features

### 1. Interactive TV Hub
- **Channel Surfing**: Cycle through projects using physical-looking TV knobs and buttons.
- **CRT Simulations**: Authentic scanlines, radial flicker, and static noise animations.
- **3D Parallax Depth**: Modern parallax scrolling that separates the TV bezel from the screen content.

### 2. The Tech Rack
- **Modular Specs**: Skills presented as physical server rack units.
- **Status LEDs**: Real-time blinking LEDs indicating proficiency levels.

### 3. VHS Archives (Lab)
- **Taped Labels**: Smaller experiments and prototypes stored on virtual VHS tapes.
- **Hover Reveal**: Tapes "pop out" of the shelf with detailed information when hovered.

### 4. Satellite Uplink
- **Social Integration**: A sliding satellite dish panel for social media connections.
- **Mode Switching**: Toggle between `PHOSPHOR` (Green) and `AMBER` (Vintage Orange) monochrome themes.

## 🛠️ Technical Analysis (C4 Model)

The project includes comprehensive architectural documentation using the C4 model, located in the [`C4-Documentation/`](./C4-Documentation/) directory:
- **[Context](./C4-Documentation/c4-context.md)**: High-level system ecosystem and user journeys.
- **[Container](./C4-Documentation/c4-container.md)**: Deployment units (Static Frontend, Node Server).
- **[Component](./C4-Documentation/c4-component.md)**: Logical grouping of UI and logic elements.
- **[Code](./C4-Documentation/c4-code-assets-js.md)**: Detailed function and style-level analysis.

## 🚀 Quick Start

### Local Development
1. Clone the repository.
2. Run the simple Node.js server:
   ```bash
   node codex-serve.js
   ```
3. Open your browser at `http://localhost:4173`.

### Configuration
Project data (projects, archives, socials) can be found and modified in `assets/js/data.js`.

---
*Created with ❤️ by The Operator.*
