<div align="center">
  <img src="./public/ArchLogo.png" alt="logo" width="80" />
  <h1>Yoshiem Portfolio</h1>
  <p>An interactive KDE Plasma desktop environment in the browser</p>
</div>

## Overview

Yoshiem Portfolio is a personal portfolio website that simulates an **Arch Linux / KDE Plasma desktop** experience. Visitors go through a boot sequence, a lock screen, and enter a fully interactive desktop with draggable windows, a taskbar, a start menu, and various applications showcasing skills, projects, and resume.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4
- **Routing:** React Router DOM v7
- **Fonts:** JetBrains Mono, Jacques Francois Shadow

## Routes

| Route | Description |
|---|---|
| `/` | Boot splash with systemd startup logs |
| `/lockscreen` | Login screen with live clock |
| `/desktop` | Full KDE Plasma desktop environment |

## Features

- **Simulated boot sequence** — Arch logo splash followed by systemd boot log
- **Lock screen** — Clock, date, and password prompt
- **Desktop environment** — Wallpapers, draggable icons, window manager with drag/resize/minimize/maximize
- **Application windows:**
  - **About Me** — Profile, skills, education
  - **Resume** — In-browser PDF viewer (Okular-style)
  - **Projects** — 3 project detail pages (UMERCH, Don Machos Kiosk, Hybrid NIDS)
  - **System Settings** — Wallpaper changer + neofetch-style system info
  - **Lifedump** — Polaroid photo gallery with lightbox
- **Taskbar** — Start menu, window list, system tray, live clock
- **Start Menu** — Searchable app launcher with categories and power controls

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## License

MIT
