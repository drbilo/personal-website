# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for a Senior Product Manager at ScreenCloud. Built with Astro for fast static site generation. Single-page design with sections for hero, about, work history, achievements, and contact.

## Build/Development Commands

- `npm install` - Install dependencies
- `npm run dev` - Start development server at localhost:4321
- `npm run build` - Production build to dist/
- `npm run preview` - Preview production build locally

## Architecture

```
src/
├── layouts/Layout.astro    - Base HTML layout with Intersection Observer for scroll animations
├── components/
│   ├── Nav.astro           - Fixed navigation with smooth scroll links
│   ├── Hero.astro          - Hero section with photo placeholder
│   ├── About.astro         - About section with skills list
│   ├── WorkHistory.astro   - Timeline-style work experience
│   ├── Achievements.astro  - Metrics/achievement cards
│   └── Footer.astro        - Contact section with social links
├── styles/global.css       - Design tokens and global styles
└── pages/index.astro       - Main page assembling all components
```

### Design System

- Colors: Muted earth tones with accent (#e94560) inspired by Oasis album artwork
- Typography: Helvetica Neue with bold/black weights
- CSS custom properties for theming defined in global.css
- Scroll animations via CSS + Intersection Observer

### Deployment

Configured for both Vercel (vercel.json) and GitHub Pages (.github/workflows/deploy.yml)
