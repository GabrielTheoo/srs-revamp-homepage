# Surgical Recovery Systems — Homepage Revamp

Static prototype of the redesigned SRS homepage. Built as the Figma reference for the design team.

## Live preview

GitHub Pages serves the site from the repo root. Visit the deployed URL — the root redirects to `/home/`.

## Local development

```bash
cd website
python -m http.server 8000
```

Open http://localhost:8000/home/

## Structure

```
website/
├── index.html              # redirect to /home/
├── styleguide.html         # design tokens reference
├── home/                   # homepage
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── shared/
│   ├── base.css            # tokens, reset, typography
│   └── components.css      # header, footer, buttons, accordion
└── assets/
    ├── images/             # homepage imagery
    └── logos/              # SVG + PNG brand marks
```

## Brand system

- **Colors:** Locked from `Colors.pdf` — Dark Blue `#284169`, Darker Blue `#1E293B`, Light Blue `#B4D7F0`, plus warm-paper and cream surfaces.
- **Typography:** Alegreya SC (display), Afacad (body).
