# MainSteam Technologies — Website

A modern, responsive marketing website for **MainSteam Technologies**, showcasing database development, system administration, IT support, and AI solutions.

## Quick Start

Open `index.html` in your browser, or run a local server:

```bash
# Python
python -m http.server 8080

# Node.js (if npx is available)
npx serve .
```

Then visit `http://localhost:8080`.

## Structure

| File | Purpose |
|------|---------|
| `index.html` | Page structure and content |
| `styles.css` | Layout, theme, and responsive design |
| `logo-3d.js` | Interactive Three.js 3D logo (database + data stream) |
| `script.js` | Navigation, scroll effects, contact form |
| `assets/mainsteam-logo-3d.png` | Static 3D logo image (favicon, fallback, social) |

## Sections

- **Hero** — Company value proposition and call-to-action
- **Services** — DB development, sysadmin, support, AI
- **About** — Company overview and differentiators
- **Process** — Discover → Plan → Build → Support
- **Contact** — Inquiry form and contact details

## Customization

Update contact details in `index.html` (email, phone). The contact form currently shows a success message client-side; wire it to your backend or a service like Formspree when ready.

## Deployment

Upload all files to any static host (GitHub Pages, Netlify, Vercel, or your web server). No build step required.

## Push to GitHub

This project is set up for the GitHub account **[@tbs4one](https://github.com/tbs4one)** (`tbs4one@live.com`).

1. Install [Git for Windows](https://git-scm.com/download/win) if needed.
2. Create a new repository on GitHub named `mainsteam-technologies` (or your preferred name).
3. In this folder, run:

```bash
git init
git add .
git commit -m "Add MainSteam Technologies website"
git branch -M main
git remote add origin https://github.com/tbs4one/mainsteam-technologies.git
git push -u origin main
```

4. Enable **GitHub Pages** in repo Settings → Pages → deploy from `main` branch.

## Social links

- GitHub: https://github.com/tbs4one
- LinkedIn: https://www.linkedin.com/in/tbs4one (`tbs4one@gmail.com`)
