# FlyRank Capstone

A capstone web application built from the ground up with vanilla HTML, CSS, and JavaScript. FlyRank Capstone is an MVP-focused project that emphasizes semantic markup, mobile-first design, and readable code — core skills for modern front-end development.

> **Note:** This repository is under active development. Documentation and project structure will expand as features are implemented.

---

## Table of Contents

- [Goals](#goals)
- [Planned Features (MVP)](#planned-features-mvp)
- [Tech Stack](#tech-stack)
- [Status](#status)
- [Setup](#setup)
- [Project Structure](#project-structure)
- [Development](#development)
- [License](#license)
- [Author](#author)

---

## Goals

- Build a functional web MVP using **HTML5**, **CSS3**, and **vanilla JavaScript** — no frameworks
- Apply **semantic HTML** and **mobile-first** responsive design
- Practice **Git** workflows and **Conventional Commits** throughout development
- Deliver a polished, accessible user experience suitable for capstone review

---

## Planned Features (MVP)

- [ ] Responsive layout and navigation
- [ ] Core FlyRank user interface
- [ ] Interactive data display and user input
- [ ] Client-side logic for ranking or sorting functionality
- [ ] Polished styling and cross-browser compatibility

*Feature list will be refined as requirements are finalized.*

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | CSS3 (mobile-first) |
| Logic | JavaScript (vanilla) |
| Version control | Git + GitHub |
| Tooling | Cursor (AI-assisted development) |

**Intentionally no frameworks** — this project focuses on web fundamentals before introducing libraries or build tools.

---

## Status

🚧 **In progress** — Week 1: environment setup

| Week | Focus | Status |
|------|--------|--------|
| 1 | Repository, tooling, and project scaffolding | ✅ In progress |
| 2 | Layout, navigation, and base styles | ⏳ Planned |
| 3 | Core feature implementation | ⏳ Planned |
| 4 | Polish, testing, and capstone delivery | ⏳ Planned |

---

## Setup

### Prerequisites

- A modern web browser (Chrome, Firefox, or Edge)
- [Git](https://git-scm.com/downloads) installed on your machine
- *(Optional)* [Cursor](https://cursor.com) or VS Code for editing

### Run locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/flyrank_capstone.git
   cd flyrank_capstone
   ```

2. **Open in the browser**

   Once `index.html` is added, open it directly in your browser, or serve the project locally:

   ```bash
   npx serve .
   ```

   Then visit `http://localhost:3000` (or the URL shown in your terminal).

### Environment variables

None required at this time. If APIs or secrets are introduced later, copy `.env.example` to `.env` and configure values locally. **Never commit `.env` files.**

---

## Project Structure

```
flyrank_capstone/
├── index.html          # Entry point (coming soon)
├── css/                # Stylesheets
├── js/                 # Application logic
├── assets/             # Images, icons, and static files
├── LICENSE
└── README.md
```

*Directory layout will be updated as the codebase grows.*

---

## Development

### Conventions

- **Semantic HTML** — use elements for meaning, not just styling
- **Mobile-first CSS** — design for small screens first, then scale up
- **Small, clearly named functions** — favor readability over cleverness
- **Comments** — only for non-obvious business logic or technical decisions

### Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages:

```
feat: add navigation bar component
fix: correct mobile menu toggle behavior
docs: update setup instructions in README
```

---

## License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## Author

**Faiqa Rashid**

Capstone project — 2026
