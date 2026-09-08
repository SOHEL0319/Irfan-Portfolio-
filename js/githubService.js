/**
 * GitHub API Service & Caching Layer
 * Mahammad Irfan Shaik — ML Engineer & Data Scientist Portfolio
 */

(function(window) {
  'use strict';

  class GitHubService {
    constructor(config) {
      this.config = config || window.PORTFOLIO_CONFIG || {};
      this.username = this.config.githubUsername || 'IRFAN18727';
      this.apiBase = 'https://api.github.com';
      this.cacheDuration = this.config.cacheDurationMs || 3600000; // 1 hour
      this.storageKey = this.config.storageKey || 'irfan_portfolio_github_cache';
      this.lastSyncKey = this.config.lastSyncKey || 'irfan_portfolio_last_synced';
    }

    /**
     * Checks if localStorage contains valid unexpired cached repositories
     */
    getCachedData() {
      try {
        const cachedJson = localStorage.getItem(this.storageKey);
        const lastSync = localStorage.getItem(this.lastSyncKey);
        if (!cachedJson || !lastSync) return null;

        const age = Date.now() - parseInt(lastSync, 10);
        if (age < this.cacheDuration) {
          return JSON.parse(cachedJson);
        }
      } catch (e) {
        console.warn('GitHubService: Could not read cache', e);
      }
      return null;
    }

    /**
     * Stores fetched repositories in localStorage
     */
    setCachedData(data) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        localStorage.setItem(this.lastSyncKey, Date.now().toString());
      } catch (e) {
        console.warn('GitHubService: Could not write cache', e);
      }
    }

    /**
     * Returns the timestamp of last successful sync
     */
    getLastSyncedAt() {
      try {
        const timestamp = localStorage.getItem(this.lastSyncKey);
        return timestamp ? new Date(parseInt(timestamp, 10)) : null;
      } catch (e) {
        return null;
      }
    }

    /**
     * Fetches public repositories from GitHub API
     */
    async fetchRepositories(forceRefresh = false) {
      if (!forceRefresh) {
        const cached = this.getCachedData();
        if (cached && Array.isArray(cached) && cached.length > 0) {
          return cached;
        }
      }

      try {
        const url = `${this.apiBase}/users/${this.username}/repos?per_page=100&sort=updated`;
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-Live-Sync'
          }
        });

        if (!response.ok) {
          throw new Error(`GitHub API returned status ${response.status}`);
        }

        const repos = await response.json();
        if (!Array.isArray(repos)) {
          throw new Error('Invalid response from GitHub API');
        }

        // Filter excluded repositories and forks
        const filtered = repos.filter(repo => {
          if (repo.fork) return false;
          if (this.config.excludedRepos && this.config.excludedRepos.includes(repo.name)) return false;
          return true;
        });

        // Enrich with README data asynchronously
        const enriched = await Promise.all(
          filtered.map(async (repo) => {
            try {
              const readmeText = await this.fetchReadme(repo.name);
              return { ...repo, readme: readmeText };
            } catch (err) {
              return { ...repo, readme: '' };
            }
          })
        );

        this.setCachedData(enriched);
        return enriched;
      } catch (error) {
        console.warn('GitHubService: API fetch failed, falling back to static cache', error);
        // Fallback 1: localStorage cache even if expired
        try {
          const cachedJson = localStorage.getItem(this.storageKey);
          if (cachedJson) return JSON.parse(cachedJson);
        } catch (e) {}

        // Fallback 2: pre-bundled fallback file (handles root or subfolder invocation)
        try {
          const fallbackPath = window.location.pathname.includes('/projects/') ? '../data/projects-live.json' : 'data/projects-live.json';
          const fallbackRes = await fetch(fallbackPath);
          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            return fallbackData;
          }
        } catch (e) {}

        return [];
      }
    }

    /**
     * Fetches raw README markdown for a specific repository
     */
    async fetchReadme(repoName) {
      try {
        const url = `${this.apiBase}/repos/${this.username}/${repoName}/readme`;
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/vnd.github.v3.raw',
            'User-Agent': 'Portfolio-Live-Sync'
          }
        });

        if (!response.ok) return '';
        return await response.text();
      } catch (err) {
        return '';
      }
    }
  }

  window.GitHubService = GitHubService;
})(window);
