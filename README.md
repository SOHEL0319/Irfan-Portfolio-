# Mahammad Irfan Shaik — Machine Learning & Data Science Portfolio

> **Production Portfolio Website** | Machine Learning Engineer • Data Scientist • Computer Vision & BI Specialist  
> Live GitHub Profile: [https://github.com/IRFAN18727](https://github.com/IRFAN18727)  
> LinkedIn: [Mahammad Irfan Shaik](https://www.linkedin.com/in/mahammad-irfan-shaik-579828286/)  
> Email: [smdirfan182@gmail.com](mailto:smdirfan182@gmail.com) • Phone: [+91 6303600159](tel:+916303600159)

---

## 🌟 Highlights & Architecture

- **Clean Single-Column Technical Case Studies**: Dedicated deep-dive engineering boards (`projects/*.html` & `projects/detail.html`) formatted in a centered, distraction-free single-column layout without sidebars or TOC clutter.
- **GitHub Live Project Synchronization**: Real-time integration with GitHub API (`IRFAN18727`) that automatically discovers new public repositories, parses markdown READMEs, detects verified technologies, and renders interactive case study boards.
- **Intelligent Offline & Rate-Limit Caching**: Multi-tier caching (`localStorage` with 1-hour TTL + fallback JSON snapshot) ensuring instantaneous load times and zero downtime.
- **Production Performance**: Zero external bulky frameworks; pure modern HTML5, CSS3 Custom Properties, and modular JavaScript achieving 60 FPS hardware-accelerated animations.
- **Direct PDF Viewing**: Main navbar and mobile drawer feature a single Resume button opening the verified PDF in a new tab via Chrome's native viewer.

---

## 📂 Project Structure

```
Irfan_Portfolio/
├── index.html                        # Main portfolio landing page
├── resume.pdf                        # Production resume PDF (dual root fallback)
├── vercel.json                       # Vercel deployment & security headers config
├── package.json                      # Build & test script definitions
├── robots.txt                        # Search engine crawling rules
├── sitemap.xml                       # SEO sitemap with all routes
├── .env.example                      # Template for optional production secrets
├── .gitignore                        # Standard ignore rules
├── api/
│   └── github-webhook.js             # Production serverless push webhook handler
├── assets/
│   ├── favicon.svg                   # Branded vector SVG favicon
│   └── resume.pdf                    # Verified resume PDF asset
├── css/
│   ├── style.css                     # Design tokens, typography & CSS variables
│   ├── components.css                # UI components, badges, filters, sync bar
│   ├── animations.css                # Hardware-accelerated keyframes & transitions
│   └── case-study.css                # Centered single-column case study styles
├── data/
│   ├── projects-config.json          # Featured projects & manual overrides config
│   └── projects-live.json            # Pre-bundled offline GitHub snapshot
├── docs/
│   └── GITHUB_INTEGRATION.md         # Comprehensive GitHub sync documentation
├── js/
│   ├── projectConfig.js              # Client-side configuration layer
│   ├── technologyDetector.js         # Domain & technology classification engine
│   ├── repositoryParser.js           # Markdown README cleaner & section extractor
│   ├── githubService.js              # GitHub REST API client & cache layer
│   ├── projectTransformer.js         # Normalizer merging flagship & live repo data
│   ├── projectSync.js                # UI coordinator & category filtering
│   ├── data.js                       # Flagship resume-backed project datasets
│   ├── contact.js                    # Validated contact form & toast notifications
│   ├── main.js                       # Title text rotator, scrollspy & nav drawer
│   └── case-study.js                 # Reading progress bar & scroll reveals
├── projects/
│   ├── smart-security-camera.html    # Flagship 01: Computer Vision & Edge AI
│   ├── weather-forecasting.html      # Flagship 02: ML Time-Series Forecasting
│   ├── ipl-analytics-dashboard.html  # Flagship 03: Power BI Sports Analytics
│   ├── eye-disease-classification.html # Flagship 04: Deep Learning & Medical AI
│   ├── toxic-comment-classifier.html # Curated 05: NLP & LSTM Classification
│   ├── school-performance-analytics.html # Curated 06: Power BI Data Modeling
│   └── detail.html                   # Dynamic Single-Column Board for new repos
└── scripts/
    ├── sync-github.js                # Build-time synchronization script
    └── test-audit.js                 # Automated production QA audit suite
```

---

## 🚀 Getting Started Locally

### 1. Clone & Install
```bash
git clone https://github.com/IRFAN18727/IrfanPortfolio.git
cd IrfanPortfolio
npm install
```

### 2. Run Local Development Server
```bash
npm start
```
Open [http://localhost:5000](http://localhost:5000) in your browser.

### 3. Run Build & Synchronize GitHub Snapshot
```bash
npm run build
```

### 4. Run Automated QA Test Suite
```bash
npm test
```

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub (`github.com/IRFAN18727/IrfanPortfolio`).
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `IrfanPortfolio` repository.
4. **Build & Output Settings**:
   - Framework Preset: **Other**
   - Build Command: `npm run build`
   - Output Directory: `./` (Root)
5. *(Optional)* **Environment Variables**:
   - `GITHUB_TOKEN`: Your GitHub Personal Access Token (enables 5,000 requests/hour).
   - `GITHUB_WEBHOOK_SECRET`: Secret token for automatic webhook-triggered redeploys on push.
6. Click **Deploy**.

---

## 🔒 Security & Privacy

- Public repositories are fetched via GitHub's public API without client-side tokens.
- No secrets, `.env` files, or private credentials are committed to version control.
- Dynamic markdown parser strips untrusted HTML, scripts, and badge URLs to prevent XSS vulnerabilities.

---

## 📄 License
MIT License © 2026 Mahammad Irfan Shaik. All rights reserved.
