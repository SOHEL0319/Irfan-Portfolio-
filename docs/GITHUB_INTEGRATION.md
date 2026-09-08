# GitHub Live Project Integration & Synchronization Guide

This guide documents the automated GitHub integration powering Mahammad Irfan Shaik's portfolio.

---

## 1. Overview
The portfolio is directly connected to GitHub (`https://github.com/IRFAN18727`).
When you create a new repository or update an existing project's README/description/topics, the portfolio automatically discovers, parses, structures, and displays the project.

---

## 2. Architecture

```
GitHub Repository (IRFAN18727)
        ↓
GitHub REST API v3 (Public & Unauthenticated)
        ↓
Repository Parser (repositoryParser.js)
        ↓
Technology & Category Detector (technologyDetector.js)
        ↓
Project Normalizer (projectTransformer.js)
        ↓
Project Configuration & Overrides (projectConfig.js)
        ↓
Live Portfolio Project Cards & Dynamic Case Study Board (detail.html)
```

---

## 3. Configuration & Manual Overrides

Configuration is defined in [`js/projectConfig.js`](../js/projectConfig.js) and [`data/projects-config.json`](../data/projects-config.json):

```javascript
window.PORTFOLIO_CONFIG = {
  githubUsername: 'IRFAN18727',
  featuredProjects: [
    'smart-security-cam',
    'Weather-Forecasting-Bangalore',
    'IPL-PowerBI-Analytics-Dashboard',
    'eye-disease-classification',
    'Toxic-Comment-Classifier',
    'School-Performance-Analytics-Dashboard'
  ],
  excludedRepos: [
    'IRFAN18727',
    'SHAIK-MAHAMMAD-IRFAN',
    'IrfanPortfolio'
  ],
  projectOverrides: {
    'your-repo-name': {
      displayTitle: 'Custom Display Title',
      category: 'Computer Vision • Real-Time AI',
      badge: 'Flagship System',
      featured: true,
      staticCaseStudyUrl: 'projects/custom-page.html' // optional
    }
  }
};
```

---

## 4. Build-Time Sync & CI/CD
To generate a pre-bundled snapshot of all active repositories:
```bash
node scripts/sync-github.js
```
This writes fresh metadata and README contents to `data/projects-live.json`.

---

## 5. Webhook Setup for Real-Time Push Sync (Optional Production)
If deploying to Vercel, Netlify, or a custom server:
1. Go to your GitHub repository -> **Settings** -> **Webhooks** -> **Add webhook**.
2. **Payload URL**: `https://your-domain.com/api/github-webhook`
3. **Content type**: `application/json`
4. **Secret**: Set a secret key in your environment as `GITHUB_WEBHOOK_SECRET`.
5. **Events**: Select `Just the push event`.
