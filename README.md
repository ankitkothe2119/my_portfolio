# Ankit Kothe | Portfolio

Personal portfolio website of **Ankit Kothe**, a Software Engineer focused on backend development, cloud infrastructure, networking and Generative AI.

**Live site:** https://my-portfolio-one-beryl-41.vercel.app/

## Features

- Responsive dark theme with gradient accents and animated background
- Live GitHub data: profile, public repos, languages, top projects, and recent activity
- Experience, education and skills loaded from a single data file
- Smooth scrolling navigation
- Zero-config deployment on Vercel

## Tech Stack

- [Next.js](https://nextjs.org/) 14 (App Router)
- React 18
- Plain CSS (no framework)
- GitHub REST API for live profile data

## Project Structure

```
.
├── app/
│   ├── globals.css     # Global styles and theme variables
│   ├── layout.js       # Root layout and page metadata
│   └── page.js         # Main page and sections
├── data/
│   └── cv.json         # Experience, education, and skills
├── public/             # Static assets
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18.18 or later
- npm

### Installation

```bash
git clone https://github.com/ankitkothe2119/portfolio.git
cd portfolio
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

## Customization

- **Experience, education, and skills:** edit `data/cv.json`.
- **Projects, links, and contact details:** edit the `projects` and `links` values at the top of `app/page.js`.
- **Colors and theme:** edit the CSS variables in `:root` inside `app/globals.css`.
- **Profile photo and name:** these are loaded from the GitHub API. Update the username in `app/page.js` (`GH_USER`) to use a different account.

## Deployment

The easiest way to deploy is [Vercel](https://vercel.com/new):

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Keep the default Next.js settings and click **Deploy**.

Every push to the main branch triggers a new deployment automatically.

## Contact

- Email: ankiitkothe@gmail.com
- LinkedIn: [linkedin.com/in/ankiitkothe](https://www.linkedin.com/in/ankiitkothe)
- GitHub: [github.com/ankitkothe2119](https://github.com/ankitkothe2119)
