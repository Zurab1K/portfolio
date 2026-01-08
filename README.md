# Zurabi Kochiashvili — Personal Portfolio

Source code for my personal portfolio website. Built with React and Tailwind CSS, featuring a scroll-driven hero/about reveal, animated navigation, and curated sections for experience and projects.

## Live Site

https://zurabikoch-portfolio.netlify.app/

## Tech Stack

- **React** (Create React App / `react-scripts`)
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**

## Features

- Intro loader with signature reveal
- Scroll-based hero/about transition
- Timeline-style experience section with active markers
- Project cards with tags, live links, and source links
- Responsive navigation with section highlighting
- Smooth scrolling and scroll-to-top control

## Project Structure

- `src/components/` — UI sections and animations
- `src/data/` — Content for experience and projects
- `public/` — Static assets (profile image, logos, project images)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Zurab1K/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run locally:
   ```bash
   npm start
   ```

## Scripts

- `npm start` — Run the dev server
- `npm test` — Run tests in watch mode
- `npm run build` — Create a production build in `build/`

## Customization

- Update hero text and CTA buttons in `src/components/Hero.jsx`
- Update the about text in `src/components/About.jsx`
- Edit experience entries in `src/data/experience.js`
- Edit project entries in `src/data/projects.js`
- Replace the headshot at `public/profile.jpeg`
- Update contact/social links in `src/components/Contact.jsx`

## Deployment

Build the site with `npm run build` and deploy the `build/` folder to any static host (Netlify, Vercel, GitHub Pages, etc.).

## License & Usage

This repository is proprietary. All rights are reserved. You may not use, copy, modify, merge, publish, distribute, sublicense, or sell any part of this software without prior written permission from the author. See `LICENSE` for full terms.

---

Created by **Zurabi Kochiashvili**.
