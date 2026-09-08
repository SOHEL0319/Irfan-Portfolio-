/**
 * Technology & Category Detection Engine
 * Mahammad Irfan Shaik — ML Engineer & Data Scientist Portfolio
 */

(function(window) {
  'use strict';

  const TECH_TAXONOMY = {
    'python': 'Python',
    'tensorflow': 'TensorFlow',
    'keras': 'Keras',
    'pytorch': 'PyTorch',
    'scikit-learn': 'Scikit-Learn',
    'sklearn': 'Scikit-Learn',
    'xgboost': 'XGBoost',
    'lightgbm': 'LightGBM',
    'opencv': 'OpenCV',
    'yolo': 'YOLO',
    'yolov8': 'YOLOv8',
    'bytetrack': 'ByteTrack',
    'deepface': 'DeepFace',
    'facenet': 'FaceNet',
    'lstm': 'LSTM',
    'cnn': 'CNN',
    'nlp': 'NLP',
    'nltk': 'NLTK',
    'spacy': 'spaCy',
    'transformers': 'Transformers',
    'huggingface': 'Hugging Face',
    'pandas': 'Pandas',
    'numpy': 'NumPy',
    'statsmodels': 'Statsmodels',
    'matplotlib': 'Matplotlib',
    'seaborn': 'Seaborn',
    'plotly': 'Plotly',
    'power bi': 'Power BI',
    'powerbi': 'Power BI',
    'dax': 'DAX',
    'power query': 'Power Query',
    'sql': 'SQL',
    'sqlite': 'SQLite',
    'postgresql': 'PostgreSQL',
    'mysql': 'MySQL',
    'mongodb': 'MongoDB',
    'streamlit': 'Streamlit',
    'flask': 'Flask',
    'fastapi': 'FastAPI',
    'django': 'Django',
    'docker': 'Docker',
    'git': 'Git',
    'jupyter': 'Jupyter Notebook',
    'jupyter notebook': 'Jupyter Notebook',
    'javascript': 'JavaScript',
    'html': 'HTML5',
    'css': 'CSS3',
    'node': 'Node.js',
    'react': 'React'
  };

  const CATEGORY_RULES = [
    {
      category: 'Computer Vision • Real-Time AI',
      keywords: ['yolo', 'yolov8', 'bytetrack', 'deepface', 'facenet', 'opencv', 'computer vision', 'camera', 'surveillance', 'object detection', 'face recognition', 'tracking', 'retinal', 'fundus', 'cnn', 'image processing']
    },
    {
      category: 'Natural Language Processing • Deep Learning',
      keywords: ['nlp', 'natural language', 'toxic', 'comment', 'text classification', 'lstm', 'sentiment', 'tokenization', 'nltk', 'transformers', 'bert', 'spacy', 'language model']
    },
    {
      category: 'Power BI • Business Intelligence',
      keywords: ['power bi', 'powerbi', 'dax', 'power query', 'star schema', 'dashboard', 'business intelligence', 'bi analytics', 'kpi']
    },
    {
      category: 'Machine Learning • Time-Series',
      keywords: ['time-series', 'time series', 'weather', 'forecasting', 'rainfall', 'xgboost', 'lag features', 'rolling statistics', 'seasonal decomposition', 'arima']
    },
    {
      category: 'Deep Learning • Neural Networks',
      keywords: ['deep learning', 'neural network', 'cnn', 'rnn', 'lstm', 'keras', 'tensorflow', 'pytorch']
    },
    {
      category: 'Data Science • Predictive Analytics',
      keywords: ['machine learning', 'scikit-learn', 'classification', 'regression', 'clustering', 'eda', 'data science', 'feature engineering', 'predictive']
    },
    {
      category: 'Web Application • Full Stack',
      keywords: ['streamlit', 'fastapi', 'flask', 'django', 'web app', 'react', 'dashboard ui']
    }
  ];

  class TechnologyDetector {
    /**
     * Detects verified technologies from repo language, topics, manifest, and README
     */
    static detectTechnologies(repo, readmeText = '') {
      const detected = new Set();
      const textToSearch = `${repo.name || ''} ${repo.description || ''} ${(repo.topics || []).join(' ')} ${readmeText}`.toLowerCase();

      // 1. Primary language
      if (repo.language && repo.language !== 'Jupyter Notebook') {
        const langLower = repo.language.toLowerCase();
        if (TECH_TAXONOMY[langLower]) {
          detected.add(TECH_TAXONOMY[langLower]);
        } else {
          detected.add(repo.language);
        }
      }

      // 2. Topics
      if (Array.isArray(repo.topics)) {
        repo.topics.forEach(topic => {
          const tLower = topic.toLowerCase().trim();
          if (TECH_TAXONOMY[tLower]) {
            detected.add(TECH_TAXONOMY[tLower]);
          } else if (tLower.length > 2) {
            detected.add(topic);
          }
        });
      }

      // 3. Exact keyword matching from taxonomy
      Object.keys(TECH_TAXONOMY).forEach(key => {
        // Regex word boundary match
        const regex = new RegExp(`\\b${key.replace('+', '\\+')}\\b`, 'i');
        if (regex.test(textToSearch)) {
          detected.add(TECH_TAXONOMY[key]);
        }
      });

      // Special case: if Jupyter Notebook was primary language, add Python + Jupyter
      if (repo.language === 'Jupyter Notebook') {
        detected.add('Python');
        detected.add('Jupyter Notebook');
      }

      // If Power BI repo
      if (textToSearch.includes('power bi') || textToSearch.includes('powerbi') || textToSearch.includes('.pbix')) {
        detected.add('Power BI');
        if (textToSearch.includes('dax')) detected.add('DAX');
      }

      return Array.from(detected);
    }

    /**
     * Classifies the repository into a domain category
     */
    static detectCategory(repo, readmeText = '') {
      const textToSearch = `${repo.name || ''} ${repo.description || ''} ${(repo.topics || []).join(' ')} ${readmeText}`.toLowerCase();

      for (const rule of CATEGORY_RULES) {
        for (const kw of rule.keywords) {
          if (textToSearch.includes(kw)) {
            return rule.category;
          }
        }
      }

      return 'Machine Learning • Data Science';
    }

    /**
     * Converts a raw repo name like "smart-security-cam" to "Smart Security Cam"
     */
    static formatTitle(repoName) {
      if (!repoName) return 'Untitled Project';
      return repoName
        .replace(/[-_]+/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
  }

  window.TechnologyDetector = TechnologyDetector;
})(window);
