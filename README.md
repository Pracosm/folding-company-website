# The Folding Company — Website

Marketing site for **The Folding Company** — the text-to-3D packaging studio. Describe a box in one sentence and Genie folds a press-ready dieline, render, and mockup.

**Live:** https://foldingcompany.vercel.app

---

## Overview

A fast, static website built with React (loaded from a CDN) and a pre-compiled JavaScript bundle. There is no server and no install step required just to run it — the compiled `bundle.js` is included.

## Run it locally

Serve the folder with any static web server and open it in a browser. For example:

```bash
# Python (built in on macOS/Linux)
python3 -m http.server 8000
# then open http://localhost:8000
```

Or use any equivalent (`npx serve`, VS Code Live Server, etc.).

## Project structure

```
index.html          Entry point (loads React + bundle.js + behaviors.js)
bundle.js           Pre-compiled build of all UI sections (generated)
behaviors.js        Interactions (nav, menus, hero, forms, animations)
build.js            Build script that regenerates bundle.js from the sources
App.jsx             Desktop app shell
sections/           Desktop page sections (hero, categories, pricing, footer…)
mobile/             Mobile page sections + mobile shell
assets/             Images, video, and logos
```

## Editing & rebuilding

The `.jsx` files in `sections/`, `mobile/`, and `App.jsx` are the source of truth. After editing them, regenerate the bundle:

```bash
npm install @babel/standalone   # one-time, provides the compiler
node build.js                   # rebuilds bundle.js
```

`behaviors.js` and `index.html` can be edited directly (no build step needed).

## Deployment

The site is deployed as a static project on **Vercel** — publishing is a push of the repository root. Any static host (Vercel, Netlify, GitHub Pages, S3, etc.) will serve it as-is.

---

*Designed and built by [Aakar Labs](aakarlabs.art).*
