/**
 * Project Configuration & Manual Overrides Layer
 * Mahammad Irfan Shaik — ML Engineer & Data Scientist Portfolio
 * GitHub: https://github.com/IRFAN18727
 */

window.PORTFOLIO_CONFIG = {
  githubUsername: 'IRFAN18727',
  profileUrl: 'https://github.com/IRFAN18727',
  cacheDurationMs: 3600000, // 1 hour client cache
  storageKey: 'irfan_portfolio_github_cache',
  lastSyncKey: 'irfan_portfolio_last_synced',

  // Pinned / Featured projects list
  featuredProjects: [
    'smart-security-cam',
    'Weather-Forecasting-Bangalore',
    'IPL-PowerBI-Analytics-Dashboard',
    'eye-disease-classification',
    'Toxic-Comment-Classifier',
    'School-Performance-Analytics-Dashboard'
  ],

  // Excluded meta, test, or profile repositories
  excludedRepos: [
    'IRFAN18727',
    'SHAIK-MAHAMMAD-IRFAN',
    'IrfanPortfolio',
    'Irfan_Portfolio',
    'portfolio'
  ],

  // Manual Overrides (Take precedence over auto-inferred data while retaining live GitHub metrics)
  projectOverrides: {
    'smart-security-cam': {
      displayTitle: 'Smart Security Camera System',
      category: 'Computer Vision • Real-Time AI',
      badge: 'Flagship CV System',
      featured: true,
      staticCaseStudyUrl: 'projects/smart-security-camera.html'
    },
    'Weather-Forecasting-Bangalore': {
      displayTitle: 'Weather Forecasting on Time-Series Data',
      category: 'Machine Learning • Time-Series',
      badge: 'ML Time-Series System',
      featured: true,
      staticCaseStudyUrl: 'projects/weather-forecasting.html'
    },
    'IPL-PowerBI-Analytics-Dashboard': {
      displayTitle: 'IPL Ball-by-Ball Analytics Dashboard',
      category: 'Power BI • Sports Analytics',
      badge: 'Power BI & DAX Platform',
      featured: true,
      staticCaseStudyUrl: 'projects/ipl-analytics-dashboard.html'
    },
    'eye-disease-classification': {
      displayTitle: 'Eye Disease Classification',
      category: 'Computer Vision • Medical AI',
      badge: 'Deep Learning & CNN',
      featured: true,
      staticCaseStudyUrl: 'projects/eye-disease-classification.html'
    },
    'Toxic-Comment-Classifier': {
      displayTitle: 'Toxic Comment Classifier',
      category: 'Natural Language Processing • Deep Learning',
      badge: 'NLP & Sequence Modeling',
      featured: true,
      staticCaseStudyUrl: 'projects/toxic-comment-classifier.html'
    },
    'School-Performance-Analytics-Dashboard': {
      displayTitle: 'School Performance Analytics Platform',
      category: 'Power BI • Academic Analytics',
      badge: 'BI & Data Modeling',
      featured: true,
      staticCaseStudyUrl: 'projects/school-performance-analytics.html'
    }
  }
};
