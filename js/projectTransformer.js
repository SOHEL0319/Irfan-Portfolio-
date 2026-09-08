/**
 * Project Data Normalizer & Transformer
 * Mahammad Irfan Shaik — ML Engineer & Data Scientist Portfolio
 */

(function(window) {
  'use strict';

  class ProjectTransformer {
    constructor(config) {
      this.config = config || window.PORTFOLIO_CONFIG || {};
    }

    /**
     * Transforms an array of raw GitHub repos into structured portfolio projects
     */
    transformAll(rawRepos) {
      if (!Array.isArray(rawRepos)) return [];

      const projects = rawRepos.map(repo => this.transformSingle(repo));

      // Sorting rule:
      // 1. Featured projects in order of featuredProjects list
      // 2. Non-featured projects by updatedAt descending
      const featuredOrder = this.config.featuredProjects || [];

      return projects.sort((a, b) => {
        const aFeaturedIndex = featuredOrder.indexOf(a.name);
        const bFeaturedIndex = featuredOrder.indexOf(b.name);

        if (aFeaturedIndex !== -1 && bFeaturedIndex !== -1) {
          return aFeaturedIndex - bFeaturedIndex;
        }
        if (aFeaturedIndex !== -1) return -1;
        if (bFeaturedIndex !== -1) return 1;

        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
    }

    /**
     * Transforms a single raw GitHub repo into a structured Project object
     */
    transformSingle(repo) {
      const overrides = (this.config.projectOverrides && this.config.projectOverrides[repo.name]) || {};
      const readme = repo.readme || '';
      const parsedData = window.RepositoryParser ? window.RepositoryParser.extractStructuredData(repo, readme) : {};
      const detectedTech = window.TechnologyDetector ? window.TechnologyDetector.detectTechnologies(repo, readme) : [];
      const detectedCat = window.TechnologyDetector ? window.TechnologyDetector.detectCategory(repo, readme) : 'Machine Learning • Data Science';

      const isFeatured = overrides.featured !== undefined 
        ? overrides.featured 
        : (this.config.featuredProjects && this.config.featuredProjects.includes(repo.name));

      const title = overrides.displayTitle || parsedData.title || (window.TechnologyDetector ? window.TechnologyDetector.formatTitle(repo.name) : repo.name);
      const category = overrides.category || detectedCat;
      const description = overrides.description || repo.description || parsedData.overview || 'Machine learning and analytical system built with verified software engineering principles.';

      // Determine case study URL: static file or dynamic viewer
      let detailUrl = overrides.staticCaseStudyUrl;
      if (!detailUrl) {
        detailUrl = `projects/detail.html?repo=${encodeURIComponent(repo.name)}`;
      }

      // Check live demo
      let liveDemoUrl = overrides.liveDemoUrl || repo.homepage || null;
      if (liveDemoUrl && (liveDemoUrl.trim() === '' || liveDemoUrl === '#' || !liveDemoUrl.startsWith('http'))) {
        liveDemoUrl = null;
      }

      return {
        id: repo.name,
        name: repo.name,
        title: title,
        category: category,
        badge: overrides.badge || (isFeatured ? 'Featured Project' : 'Live Repository'),
        description: description,
        technologies: detectedTech.length > 0 ? detectedTech : ['Python', 'Machine Learning'],
        githubUrl: repo.html_url || `https://github.com/${this.config.githubUsername}/${repo.name}`,
        liveDemoUrl: liveDemoUrl,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        isFeatured: isFeatured,
        isFlagship: !!overrides.staticCaseStudyUrl,
        detailUrl: detailUrl,
        // Detailed Case Study Fields
        overview: parsedData.overview || description,
        problem: parsedData.problem || [],
        objectives: parsedData.objectives || [],
        architecture: parsedData.architecture || null,
        features: parsedData.features || [],
        results: parsedData.results || [],
        decisions: parsedData.decisions || [],
        futureScope: parsedData.futureScope || []
      };
    }
  }

  window.ProjectTransformer = ProjectTransformer;
})(window);
