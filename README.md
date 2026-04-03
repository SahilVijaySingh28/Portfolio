# 🌌 Sahil OS v2.1 — The Interactive Cyber-Portfolio

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-7dd3fc?style=for-the-badge)](https://github.com/darkroomengineering/lenis)

A high-end, production-grade personal portfolio designed as a **Cybernetic Operating System**. This project transcends static resumes, offering a hyper-performant, immersive digital experience featuring a functional visitor shell, real-time theming, and "Chaos Mode" layout manipulation.

## ✨ Elite Features

- **🕵️ Silent Breach (Chaos Mode)**: Run the `hack` command to take total control. Enable **Live Text Editing** and **Draggable Layout Elements** site-wide. Manipulate, rearrange, and "rewrite" the portfolio in real-time.
- **🛹 Inertial Smooth Scrolling**: Integrated **Lenis** for high-performance, "weighted" scrolling that feels premium on all modern displays.
- **🖥️ Interactive Visitor Shell**: A fully functional terminal (`Backtick` key to toggle) with custom commands (`whoami`, `matrix`, `glitch`, `hack`, `reset`).
- **⚡ Real-time System Theming**: Instant site-wide color swaps between **Cyber-Cyan** (Default), **Matrix Green**, and **Glitch Purple** via the Terminal command engine.
- **🎮 Hacking & Debug Minigames**: RobCo-inspired password cracking and bug-squashing protocols built directly into the system shell.
- **🧊 3D Orbital Mascot**: An interactive 3D droid mascot optimized with **React Three Fiber** and direct mouse-state tracking for 60FPS fluid interactions.
- **🖱️ Precision Cursor Gear**: A Liquid Physics cursor using `useMotionValue` and `useSpring` to eliminate React re-renders and maximize interaction speed.
- **🗺️ Smart Navigation Sync**: Intelligent scrolling logic using `IntersectionObserver` and polling to ensure the Navbar is always synchronized across routes.

## 🛠️ Performance-First Tech Stack

### Framework & UI
- **React 18 (Vite)**: Lightning-fast HMR and production builds.
- **Tailwind CSS**: Utility-first styling with a custom **Neon Design System**.
- **Framer Motion**: Snappy `easeOutExpo` animations and complex gestures.

### Performance & Motion
- **Lenis Scroll**: The industry standard for high-performance inertial scrolling.
- **Three.js / R3F**: Optimized 3D rendering with custom shaders.
- **CSS Variables Engine**: Real-time theme injection for global color overrides.

### Systems
- **Matter-js**: Physics engine for terminal-based minigames.
- **Lucide React**: Clean, semantic iconography.

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Commands

1. **Clone & Enter**
   ```bash
   git clone https://github.com/SahilVijaySingh28/portifolio.git
   cd portifolio
   ```

2. **Install Systems**
   ```bash
   npm install
   ```

3. **Initialize Dev Environment**
   ```bash
   npm run dev
   ```

4. **Production Compile**
   ```bash
   npm run build
   ```

## 🧠 Terminal Power Commands (`Backtick`)

Access the visitor shell to execute these OS protocols:
- `matrix` — Override site colors with **High-Contrast Matrix Green**.
- `glitch` — Induce system instability with **Purple RGB Distortion**.
- `hack` — **Silent Breach Mode**: Enables Drag-and-Drop sections and Live Text Editing.
- `reset` — Restores the default **Sahil OS** Cyan/Purple theme.
- `play` — Initiates the terminal-based password cracking challenge.
- `debug` — Launches the bug-squashing exterminator game.

## 📁 Project Architecture

```text
Portifolio/
├── src/
│   ├── components/
│   │   ├── Terminal.jsx       # Global Visitor Shell
│   │   ├── SmoothScroll.jsx   # Lenis Integration Layer
│   │   ├── OrbitalDroid.jsx   # 3D optimized mascot
│   │   ├── CustomCursor.jsx   # 60FPS spring cursor
│   │   └── ...                # Thematic UI Sections
│   ├── App.jsx                # Global Environment & Themes
│   ├── index.css              # Custom CSS Variable System
│   └── main.jsx               # Entry Point
├── public/
│   └── favicon.png            # New Circular Branding
└── tailwind.config.js         # Reactive Theme Tokens
```

---

**Designed & Engineered with ❤️ by [Sahil Vijay Singh](https://github.com/SahilVijaySingh28)**
