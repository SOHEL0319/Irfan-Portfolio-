/**
 * Centralized Verified Portfolio Data
 * Mahammad Irfan Shaik — ML Engineer & Data Scientist
 * Source of Truth: Verified Resume & GitHub Profile (github.com/IRFAN18727)
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Mahammad Irfan Shaik",
    role: "Machine Learning Engineer | Data Scientist",
    tagline: "Building intelligent systems from data, models, and real-world problems.",
    email: "smdirfan182@gmail.com",
    phone: "+91 6303600159",
    location: "Andhra Pradesh, India",
    github: "https://github.com/IRFAN18727",
    linkedin: "https://www.linkedin.com/in/mahammad-irfan-shaik-579828286/",
    availability: "Open to opportunities in Machine Learning, Data Science & AI"
  },

  about: {
    bio: [
      "I am an early-career Machine Learning Engineer and Data Scientist with a strong academic background in Artificial Intelligence & Machine Learning from VIT-AP University. I specialize in developing end-to-end intelligent systems spanning Computer Vision, Deep Learning, Time-Series Forecasting, and Business Intelligence.",
      "My engineering philosophy emphasizes production viability, data integrity, and measurable outcomes. Whether architecting real-time multi-person tracking pipelines, training deep neural networks for medical imaging, or building interactive analytics dashboards for multi-season sports telemetry, I prioritize robust code architecture and reproducible results."
    ],
    facts: {
      degree: "B.Tech in CSE (Artificial Intelligence & Machine Learning)",
      institution: "VIT-AP University, Amaravati",
      duration: "2021 – 2025",
      cgpa: "8.76 / 10",
      focusAreas: [
        "Machine Learning & Deep Learning",
        "Computer Vision & Multi-Object Tracking",
        "Time-Series Forecasting",
        "Business Intelligence & Data Storytelling"
      ]
    }
  },

  skills: [
    {
      category: "Programming & Foundations",
      icon: "code",
      items: ["Python", "Java", "SQL", "Data Structures & Algorithms", "Git", "Docker"]
    },
    {
      category: "Machine Learning & Deep Learning",
      icon: "cpu",
      items: ["Scikit-Learn", "TensorFlow", "XGBoost", "LSTM", "CNN", "Hyperparameter Tuning"]
    },
    {
      category: "Computer Vision",
      icon: "camera",
      items: ["OpenCV", "YOLOv8", "ByteTrack", "DeepFace", "FaceNet", "Image Preprocessing"]
    },
    {
      category: "Natural Language Processing",
      icon: "message-square",
      items: ["NLTK", "Text Preprocessing", "Multi-Label Classification", "Sequence Modeling"]
    },
    {
      category: "Data Engineering & Analytics",
      icon: "bar-chart-2",
      items: ["NumPy", "Pandas", "Statsmodels", "Data Cleaning", "Feature Engineering", "Lag Features"]
    },
    {
      category: "Visualization & Dashboards",
      icon: "pie-chart",
      items: ["Power BI", "DAX", "Plotly", "Matplotlib", "Seaborn", "Streamlit"]
    }
  ],

  featuredProjects: [
    {
      id: "smart-security-cam",
      num: "01",
      title: "Smart Security Camera System",
      category: "COMPUTER VISION • REAL-TIME AI",
      badgeContext: "Flagship CV System",
      shortDesc: "Real-time edge security and surveillance pipeline combining YOLOv8 person detection, ByteTrack multi-object tracking, and DeepFace/FaceNet facial recognition with automated Telegram alerts and live Streamlit/Plotly telemetry.",
      technologies: ["Python", "YOLOv8", "ByteTrack", "DeepFace", "FaceNet", "OpenCV", "SQLite", "Streamlit", "Plotly", "Telegram Bot API", "Docker"],
      metrics: [
        { label: "Core Capabilities", value: "Real-Time Tracking & ID" },
        { label: "Alert Dispatch", value: "Instant Telegram Bot" },
        { label: "Telemetry", value: "Streamlit + Plotly UI" },
        { label: "Deployment", value: "Dockerized Container" }
      ],
      highlights: [
        "Real-time person detection powered by custom YOLOv8 inference pipeline.",
        "Multi-person continuous tracking with ByteTrack ID assignment across video frames.",
        "Facial recognition engine utilizing DeepFace/FaceNet for known vs. unknown classification.",
        "Event and dwell-timer management with automatic SQLite logging.",
        "Automated Telegram snapshot alert dispatch upon unauthorized intrusion.",
        "Interactive web monitoring dashboard with historical event analytics."
      ],
      workflow: [
        "Camera Feed",
        "YOLOv8 Person Detection",
        "ByteTrack Multi-Object Tracking",
        "Face Detection & Recognition",
        "Event & Timer Processing",
        "SQLite Event Logging",
        "Telegram Alerts",
        "Streamlit + Plotly Dashboard"
      ],
      details: {
        problem: "Traditional surveillance setups generate unmanageable video streams without actionable intelligence, leading to missed security intrusions and slow event auditing.",
        approach: "Built an end-to-end edge AI vision pipeline integrating person localization, spatial tracking across occlusion boundaries, identity verification, structured event persistence, and immediate notification channels.",
        architecture: "Frames are ingested from RTSP/webcam feeds → YOLOv8 generates bounding boxes → ByteTrack assigns persistent track IDs → cropped face regions pass through FaceNet embeddings → event timestamps log to SQLite → alert daemon triggers Telegram API payloads → live dashboard queries telemetry.",
        results: "Successfully achieves synchronized real-time tracking, reliable multi-subject state management, low false-positive alert dispatches, and containerized Docker reproducibility."
      },
      github: "https://github.com/IRFAN18727/smart-security-cam",
      liveDemo: null
    },
    {
      id: "weather-forecasting",
      num: "02",
      title: "Weather Forecasting on Time-Series Data",
      category: "MACHINE LEARNING • TIME SERIES",
      badgeContext: "86.45% Rain-Day Accuracy",
      shortDesc: "Predictive weather modeling system built on historical Bangalore rainfall records utilizing feature engineering (lag terms, rolling statistics, seasonal decomposition) with comparative evaluation of XGBoost and LSTM architectures.",
      technologies: ["Python", "Pandas", "Statsmodels", "Scikit-Learn", "XGBoost", "LSTM / TensorFlow", "Matplotlib", "Seaborn"],
      metrics: [
        { label: "XGBoost Rain-Day Acc.", value: "86.45%" },
        { label: "LSTM Rain-Day Acc.", value: "86.36%" },
        { label: "Dataset Context", value: "Bangalore Meteorological Data" },
        { label: "Feature Engineering", value: "Lag & Rolling Windows" }
      ],
      highlights: [
        "Analyzed multi-year Bangalore weather and rainfall time-series patterns.",
        "Constructed temporal lag features, rolling averages, and seasonal decomposition indicators.",
        "Trained Gradient Boosted Trees (XGBoost) achieving 86.45% rain-day classification accuracy.",
        "Implemented Long Short-Term Memory (LSTM) recurrent neural network achieving 86.36% rain-day accuracy.",
        "Conducted cross-model validation and residual error analysis to identify precipitation seasonality."
      ],
      workflow: [
        "Raw Climate Data",
        "Cleaning & Imputation",
        "Lag & Rolling Stats",
        "Seasonal Decomposition",
        "Train / Test Split",
        "XGBoost & LSTM Models",
        "Performance Evaluation"
      ],
      details: {
        problem: "Accurate local precipitation forecasting is critical for municipal water management and urban logistics, but standard static regressions struggle with non-linear temporal dependencies and monsoon seasonality.",
        approach: "Engineered a time-series pipeline incorporating temporal lag dynamics and moving statistics, followed by comparative modeling using gradient boosting and sequential deep neural networks.",
        architecture: "Historical records → missing value imputation & outlier clipping → sliding window lag extraction (t-1, t-3, t-7, t-30) → seasonal trend decomposition → XGBoost hyperparameter tuning & LSTM sequential layer training → validation against unseen holdout time periods.",
        results: "Delivered 86.45% accuracy with XGBoost and 86.36% accuracy with LSTM for discrete rain-day prediction on Bangalore historical climate data."
      },
      github: "https://github.com/IRFAN18727/Weather-Forecasting-Bangalore",
      liveDemo: null
    },
    {
      id: "ipl-analytics",
      num: "03",
      title: "IPL Ball-by-Ball Analytics Dashboard",
      category: "DATA ANALYTICS • POWER BI",
      badgeContext: "200,000+ Ball Records",
      shortDesc: "Comprehensive business intelligence and cricket telemetry platform analyzing over 200,000 ball-by-ball deliveries (IPL 2008–2023) across a structured 4-page interactive Power BI dashboard.",
      technologies: ["Power BI", "DAX", "Data Modeling", "Python", "Data Cleaning", "Data Quality Handling"],
      metrics: [
        { label: "Dataset Volume", value: "200,000+ Balls" },
        { label: "Timeframe Span", value: "2008 – 2023 (16 Seasons)" },
        { label: "Dashboard Scope", value: "4 Interactive Views" },
        { label: "Logic Engine", value: "Advanced DAX Measures" }
      ],
      highlights: [
        "Processed and sanitized massive ball-by-ball delivery datasets spanning 16 IPL seasons.",
        "Constructed star-schema data models linking matches, deliveries, players, and venues.",
        "Created advanced DAX calculations for strike rates, economy rates, phase-wise scoring, and head-to-head records.",
        "Built a 4-page dashboard: Season Overview, Match-wise Analysis, Batting Dynamics, and Bowling Performance."
      ],
      workflow: [
        "IPL Raw Datasets",
        "Python ETL & Data Cleaning",
        "Star Schema Data Modeling",
        "DAX Measures Engine",
        "Interactive 4-Page BI UI"
      ],
      details: {
        problem: "Unstructured ball-by-ball cricket data contains extensive variations in player names, edge-case extras, and complex match states, making comprehensive performance discovery difficult for analysts.",
        approach: "Cleaned and normalized 16 years of IPL match telemetry, developed a scalable relational data model, and engineered specialized DAX calculations to isolate batting strike rates and bowling economy across match phases (Powerplay, Middle, Death overs).",
        architecture: "Raw delivery logs → Python data normalization → Power BI data model with dim_players, dim_matches, and fact_deliveries tables → dynamic slicers and KPI scorecards.",
        results: "Delivered an intuitive, responsive 4-page analytics platform enabling granular drill-downs across player career stats, head-to-head match dynamics, and venue trends."
      },
      github: "https://github.com/IRFAN18727/IPL-PowerBI-Analytics-Dashboard",
      liveDemo: null
    },
    {
      id: "eye-disease-classification",
      num: "04",
      title: "Eye Disease Classification",
      category: "COMPUTER VISION • MEDICAL AI",
      badgeContext: "SmartInternz Internship",
      shortDesc: "Deep convolutional neural network developed during SmartInternz internship to categorize ocular conditions from retinal fundus imagery, featuring dedicated preprocessing pipelines achieving 20% noise reduction and 92%+ classification accuracy.",
      technologies: ["Python", "Convolutional Neural Networks (CNN)", "Computer Vision", "Image Enhancement", "OpenCV", "Hyperparameter Tuning"],
      metrics: [
        { label: "Model Accuracy", value: "92%+" },
        { label: "Noise Reduction", value: "20% Improvement" },
        { label: "Input Modality", value: "Retinal Fundus Imagery" },
        { label: "Duration", value: "Aug 2023 – Nov 2023" }
      ],
      highlights: [
        "Developed CNN architecture for multi-class retinal condition classification.",
        "Engineered preprocessing pipelines for illumination correction, contrast enhancement, and normalization.",
        "Achieved a 20% reduction in image noise artifacts prior to model feeding.",
        "Attained 92%+ classification accuracy across validation cohorts."
      ],
      workflow: [
        "Retinal Fundus Scans",
        "Denoising & Contrast",
        "Normalization & Augmentation",
        "CNN Deep Learning",
        "Validation & Classification"
      ],
      details: {
        problem: "Retinal fundus photographs often exhibit high variance in illumination, optical artifacts, and noise, presenting substantial challenges for automated diagnostic screening.",
        approach: "Implemented specialized computer vision preprocessing filters for noise suppression followed by convolutional feature extraction to detect subtle pathological lesions.",
        architecture: "Fundus image ingestion → adaptive histogram equalization and Gaussian filtering (20% noise reduction) → image augmentation (rotation, flips) → CNN convolutional and dense feature layers → softmax multi-class categorization.",
        results: "Delivered 92%+ classification accuracy on retinal test sets, demonstrating practical efficacy in computer vision preprocessing and deep learning classification workflows."
      },
      github: "https://github.com/IRFAN18727",
      liveDemo: null
    }
  ],

  secondaryProjects: [
    {
      title: "Toxic Comment Classifier",
      category: "NLP • DEEP LEARNING",
      desc: "Deep Learning and NLP system utilizing Long Short-Term Memory (LSTM) neural networks for multi-label text classification to detect multiple categories of toxic language in text datasets.",
      technologies: ["Python", "LSTM", "NLP", "TensorFlow", "NLTK", "Jupyter Notebook"],
      github: "https://github.com/IRFAN18727/Toxic-Comment-Classifier"
    },
    {
      title: "School Performance Analytics Dashboard",
      category: "BUSINESS INTELLIGENCE • DATA MODELING",
      desc: "End-to-End Business Intelligence solution built using Power BI and DAX to evaluate student performance, attendance metrics, branch-level comparisons, and class performance trends.",
      technologies: ["Power BI", "DAX", "Data Modeling", "ETL", "Analytics"],
      github: "https://github.com/IRFAN18727/School-Performance-Analytics-Dashboard"
    }
  ],

  experience: [
    {
      role: "Student Intern",
      organization: "SmartInternz",
      period: "Aug 2023 – Nov 2023",
      project: "Eye Disease Classification (CNN & Computer Vision)",
      details: [
        "Engineered a Convolutional Neural Network (CNN) pipeline for classifying retinal fundus images across multiple ocular conditions.",
        "Implemented image enhancement, normalization, and noise reduction techniques resulting in a 20% reduction in image noise.",
        "Tuned model hyperparameters to achieve 92%+ classification accuracy across test datasets.",
        "Gained hands-on experience in medical image preprocessing, model training, and performance evaluation."
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      specialization: "Computer Science and Engineering (AI & ML)",
      institution: "VIT-AP University",
      location: "Amaravati, Andhra Pradesh",
      period: "2021 – 2025",
      score: "CGPA: 8.76 / 10",
      highlights: "Core coursework in Machine Learning, Deep Learning, Computer Vision, Natural Language Processing, Data Structures, and Database Systems."
    },
    {
      degree: "Board of Intermediate Education (MPC)",
      specialization: "Mathematics, Physics, Chemistry",
      institution: "Lakshyaa Junior College",
      location: "Vijayawada, Andhra Pradesh",
      period: "2019 – 2021",
      score: "Percentage: 95.8%",
      highlights: "Strong analytical foundation in higher mathematics, linear algebra, calculus, and physical sciences."
    }
  ],

  certifications: [
    {
      title: "Machine Learning Specialization",
      issuer: "Coursera — DeepLearning.AI",
      instructor: "Andrew Ng",
      desc: "Comprehensive foundation in supervised learning, neural networks, decision trees, unsupervised learning, recommender systems, and reinforcement learning principles."
    },
    {
      title: "Google Student Developer — AI/ML Certified",
      issuer: "SmartInternz",
      desc: "Hands-on certification covering practical AI/ML workflows, deep learning implementations, image classification, and modern development practices."
    },
    {
      title: "Data Structures and Algorithms",
      issuer: "Board Infinity",
      desc: "Rigorous training in algorithmic complexity, data structures (arrays, trees, graphs, heaps), dynamic programming, and computational problem-solving."
    },
    {
      title: "Java Development on Oracle Cloud",
      issuer: "Oracle",
      desc: "Core object-oriented programming in Java, enterprise software concepts, and cloud deployment principles on the Oracle platform."
    }
  ]
};
