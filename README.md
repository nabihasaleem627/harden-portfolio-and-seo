# Harden Portfolio and SEO

A responsive and production-ready developer portfolio hardened through real-world edge-case testing, accessibility checks, performance testing, and SEO improvements.

## Overview

This project was completed as part of the **“Break Your Own Site” Week 7** assignment. The goal was to identify where the portfolio breaks, fix critical issues, document known limitations, and improve its discoverability and overall reliability.

## Key Improvements

* Tested empty and invalid form submissions
* Tested rapid/double submissions
* Tested buttons, navigation, demo links, and repository links
* Tested responsive layouts across screen sizes
* Checked browser compatibility
* Fixed identified critical issues
* Added SEO title and meta description
* Added Open Graph social sharing metadata
* Added favicon and descriptive image alt text
* Improved accessibility and keyboard navigation
* Checked console errors and broken assets
* Optimized performance where required
* Added `robots.txt` and sitemap where applicable
* Documented fixed issues and known limitations

## Testing & Hardening

Testing focused on real edge cases rather than only the normal user flow.

| Area                  | Status   |
| --------------------- | -------- |
| Empty inputs          | Tested   |
| Invalid inputs        | Tested   |
| Rapid submissions     | Tested   |
| Navigation            | Tested   |
| External links        | Tested   |
| Responsive design     | Tested   |
| Browser compatibility | Tested   |
| Accessibility         | Tested   |
| SEO metadata          | Added    |
| Performance           | Checked  |
| Production build      | Verified |

Detailed findings and fixes are documented in [`HARDENING.md`](./HARDENING.md).

## SEO

The portfolio includes:

* Optimized page title
* Meta description
* Open Graph metadata
* Social sharing preview
* Semantic heading structure
* Image alt text
* Favicon
* Canonical metadata where applicable
* Search-engine-friendly configuration

## Technologies

* HTML
* CSS
* JavaScript
* [Add your framework/library here if applicable]

## Project Structure

```text
harden-portfolio-and-seo/
├── public/
├── src/
├── HARDENING.md
├── README.md
├── robots.txt
├── sitemap.xml
├── package.json
└── .gitignore
```

> The exact structure may vary depending on the project setup.

## Getting Started

### Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/harden-portfolio-and-seo.git
cd harden-portfolio-and-seo
```

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Known Limitations

Remaining limitations are documented honestly in `HARDENING.md`. These may include external service restrictions, search engine indexing delays, or other dependencies outside the portfolio's direct control.

## Assignment

**Track:** General AI Fluency
**Week:** 7
**Assignment:** Break Your Own Site
**Focus:** Testing, hardening, SEO, accessibility, performance, and honest documentation.

## Author

**Nabiha Saleem**
Full Stack Web Developer
