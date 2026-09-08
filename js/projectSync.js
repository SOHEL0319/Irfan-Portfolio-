/**
 * Project Sync & Live UI Orchestration
 * Mahammad Irfan Shaik — ML Engineer & Data Scientist Portfolio
 */

(function(window) {
  'use strict';

  class ProjectSync {
    constructor() {
      this.config = window.PORTFOLIO_CONFIG || {};
      this.service = new window.GitHubService(this.config);
      this.transformer = new window.ProjectTransformer(this.config);
      this.projects = [];
      this.currentFilter = 'all';

      this.featuredContainer = document.getElementById('featuredProjectsGrid');
      this.liveContainer = document.getElementById('liveProjectsGrid');
      this.liveSection = document.getElementById('liveProjectsSection');
      this.syncBadge = document.getElementById('githubSyncBadge');
      this.syncTimeText = document.getElementById('syncTimeText');
      this.syncBtn = document.getElementById('syncRefreshBtn');
    }

    async init() {
      this.setupEventListeners();
      await this.loadProjects(false);
    }

    setupEventListeners() {
      if (this.syncBtn) {
        this.syncBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          this.syncBtn.classList.add('syncing');
          await this.loadProjects(true);
          setTimeout(() => {
            this.syncBtn.classList.remove('syncing');
            if (window.contactManager && typeof window.contactManager.showToast === 'function') {
              window.contactManager.showToast('Projects refreshed from GitHub!', 'success');
            }
          }, 600);
        });
      }

      // Filter tabs
      const filterBtns = document.querySelectorAll('.project-filter-btn');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.currentFilter = btn.dataset.filter || 'all';
          this.renderAll();
        });
      });
    }

    async loadProjects(forceRefresh = false) {
      this.showSkeletons();
      try {
        const rawRepos = await this.service.fetchRepositories(forceRefresh);
        this.projects = this.transformer.transformAll(rawRepos);
        this.updateSyncStatus();
        this.renderAll();
      } catch (err) {
        console.error('ProjectSync: Error loading projects', err);
        this.updateSyncStatus();
      }
    }

    showSkeletons() {
      if (this.liveContainer) {
        this.liveContainer.innerHTML = `
          <div class="project-card skeleton-card">
            <div class="skeleton-shimmer" style="height: 16px; width: 30%; margin-bottom: 12px; border-radius: 4px;"></div>
            <div class="skeleton-shimmer" style="height: 28px; width: 65%; margin-bottom: 16px; border-radius: 6px;"></div>
            <div class="skeleton-shimmer" style="height: 60px; width: 100%; margin-bottom: 20px; border-radius: 6px;"></div>
            <div class="skeleton-shimmer" style="height: 30px; width: 80%; border-radius: 100px;"></div>
          </div>
          <div class="project-card skeleton-card">
            <div class="skeleton-shimmer" style="height: 16px; width: 30%; margin-bottom: 12px; border-radius: 4px;"></div>
            <div class="skeleton-shimmer" style="height: 28px; width: 65%; margin-bottom: 16px; border-radius: 6px;"></div>
            <div class="skeleton-shimmer" style="height: 60px; width: 100%; margin-bottom: 20px; border-radius: 6px;"></div>
            <div class="skeleton-shimmer" style="height: 30px; width: 80%; border-radius: 100px;"></div>
          </div>
        `;
      }
    }

    updateSyncStatus() {
      const lastSync = this.service.getLastSyncedAt();
      if (this.syncTimeText && lastSync) {
        const timeStr = lastSync.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.syncTimeText.textContent = `GitHub Live Sync: ${timeStr}`;
      } else if (this.syncTimeText) {
        this.syncTimeText.textContent = `GitHub Live Sync: Connected`;
      }
    }

    matchesFilter(project) {
      if (this.currentFilter === 'all') return true;
      const catLower = (project.category || '').toLowerCase();
      const techLower = (project.technologies || []).join(' ').toLowerCase();

      if (this.currentFilter === 'cv') {
        return catLower.includes('vision') || techLower.includes('yolo') || techLower.includes('opencv');
      }
      if (this.currentFilter === 'ml') {
        return catLower.includes('machine learning') || catLower.includes('time-series') || techLower.includes('xgboost') || techLower.includes('scikit');
      }
      if (this.currentFilter === 'nlp') {
        return catLower.includes('nlp') || catLower.includes('language') || techLower.includes('lstm') || techLower.includes('nltk');
      }
      if (this.currentFilter === 'bi') {
        return catLower.includes('power bi') || catLower.includes('bi') || techLower.includes('power bi') || techLower.includes('dax');
      }
      return true;
    }

    renderAll() {
      // 1. Filter main static project cards in .projects-container
      const mainCards = document.querySelectorAll('.projects-container > .project-card:not(.skeleton-card)');
      mainCards.forEach(card => {
        const cat = (card.getAttribute('data-category') || '').toLowerCase();
        const tech = (card.querySelector('.project-tech-tags')?.textContent || '').toLowerCase();
        const title = (card.querySelector('.project-title')?.textContent || '').toLowerCase();
        const fullText = cat + ' ' + tech + ' ' + title;

        let match = false;
        if (this.currentFilter === 'all') {
          match = true;
        } else if (this.currentFilter === 'cv') {
          match = fullText.includes('vision') || fullText.includes('yolo') || fullText.includes('opencv') || fullText.includes('camera') || fullText.includes('retinal') || fullText.includes('eye');
        } else if (this.currentFilter === 'ml') {
          match = fullText.includes('machine learning') || fullText.includes('time series') || fullText.includes('weather') || fullText.includes('xgboost') || fullText.includes('lstm');
        } else if (this.currentFilter === 'bi') {
          match = fullText.includes('power bi') || fullText.includes('dax') || fullText.includes('analytics') || fullText.includes('bi') || fullText.includes('ipl') || fullText.includes('school');
        } else if (this.currentFilter === 'nlp') {
          match = fullText.includes('nlp') || fullText.includes('language') || fullText.includes('toxic') || fullText.includes('comment') || fullText.includes('text');
        }

        if (match) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      // 2. Non-Featured / Additional Live Repositories
      const additional = this.projects.filter(p => !p.isFeatured && this.matchesFilter(p));

      // If we have additional live repositories discovered
      if (this.liveSection && this.liveContainer) {
        if (additional.length > 0) {
          this.liveSection.style.display = 'block';
          this.liveContainer.innerHTML = additional.map(p => this.renderProjectCard(p, false)).join('');
        } else {
          this.liveSection.style.display = 'none';
        }
      }

      // Re-trigger scroll reveal
      if (window.contactManager && typeof window.contactManager.initReveal === 'function') {
        window.contactManager.initReveal();
      } else {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
      }
    }

    renderProjectCard(p, isFlagship = false) {
      const techBadges = (p.technologies || []).slice(0, 5).map(t => `<span class="floating-tech-pill tech-tag">${t}</span>`).join('');
      const cardClass = isFlagship ? 'project-card project-card-flagship reveal' : 'project-card reveal';

      return `
        <article class="${cardClass}" data-repo="${p.name}">
          <div class="project-card-content">
            <div class="project-header-row">
              <span class="project-category">${p.category}</span>
              ${p.stars > 0 ? `
                <div class="project-stars-badge" title="${p.stars} GitHub Stars">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <span>${p.stars}</span>
                </div>
              ` : ''}
            </div>

            <h3 class="project-title">
              <a href="${p.detailUrl}">${p.title}</a>
            </h3>
            <p class="project-description">${p.description}</p>
          </div>

          <div class="project-footer-row">
            <div class="floating-tech-area project-tech-tags">
              ${techBadges}
            </div>

            <div class="project-actions">
              <a href="${p.detailUrl}" class="btn btn-primary">
                <span>View Case Study</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" aria-label="GitHub Repository">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <span>Repository</span>
              </a>
              ${p.liveDemoUrl ? `
                <a href="${p.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" aria-label="Live Demo">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  <span>Live Demo</span>
                </a>
              ` : ''}
            </div>
          </div>
        </article>
      `;
    }
  }

  window.ProjectSync = ProjectSync;

  document.addEventListener('DOMContentLoaded', () => {
    const sync = new ProjectSync();
    sync.init();
    window.projectSyncInstance = sync;
  });
})(window);
