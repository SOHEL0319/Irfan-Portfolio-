/**
 * Interactive Project Detail Modal Manager
 * Mahammad Irfan Shaik — ML Engineer & Data Scientist Portfolio
 */

class ProjectModalManager {
  constructor() {
    this.modalBackdrop = document.getElementById('projectModal');
    this.modalContent = document.getElementById('modalContent');
    this.closeBtn = document.getElementById('modalCloseBtn');
    this.lastFocusedElement = null;

    this.init();
  }

  init() {
    if (!this.modalBackdrop || !this.closeBtn) return;

    // Event listeners
    this.closeBtn.addEventListener('click', () => this.close());
    
    this.modalBackdrop.addEventListener('click', (e) => {
      if (e.target === this.modalBackdrop) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // Delegate project detail trigger clicks
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-project-id]');
      if (trigger) {
        e.preventDefault();
        const projectId = trigger.getAttribute('data-project-id');
        this.open(projectId, trigger);
      }
    });
  }

  isOpen() {
    return this.modalBackdrop && this.modalBackdrop.classList.contains('open');
  }

  open(projectId, triggerElement = null) {
    const project = PORTFOLIO_DATA.featuredProjects.find(p => p.id === projectId);
    if (!project) return;

    this.lastFocusedElement = triggerElement || document.activeElement;
    this.renderProjectDetails(project);

    this.modalBackdrop.classList.add('open');
    this.modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Set focus to close button for keyboard accessibility
    setTimeout(() => {
      this.closeBtn.focus();
    }, 50);
  }

  close() {
    if (!this.isOpen()) return;

    this.modalBackdrop.classList.remove('open');
    this.modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
      this.lastFocusedElement.focus();
    }
  }

  renderProjectDetails(project) {
    if (!this.modalContent) return;

    const techBadges = project.technologies
      .map(tech => `<span class="tech-tag">${this.escapeHTML(tech)}</span>`)
      .join('');

    const highlightsList = project.highlights
      .map(h => `<li>${this.escapeHTML(h)}</li>`)
      .join('');

    const workflowSteps = project.workflow
      ? project.workflow.map((step, idx) => `
          <div class="workflow-node">${this.escapeHTML(step)}</div>
          ${idx < project.workflow.length - 1 ? '<span class="workflow-arrow">➔</span>' : ''}
        `).join('')
      : '';

    const metricsHTML = project.metrics
      ? `<div class="project-metrics-grid" style="margin-top: 1rem; margin-bottom: 1.5rem;">
          ${project.metrics.map(m => `
            <div class="metric-box">
              <div class="metric-stat">${this.escapeHTML(m.value)}</div>
              <div class="metric-context">${this.escapeHTML(m.label)}</div>
            </div>
          `).join('')}
        </div>`
      : '';

    this.modalContent.innerHTML = `
      <div class="modal-category-tag">${this.escapeHTML(project.category)}</div>
      <h2 class="modal-title">${this.escapeHTML(project.title)}</h2>

      ${metricsHTML}

      <div class="modal-section">
        <h3 class="modal-section-title">Project Overview</h3>
        <p class="modal-section-content">${this.escapeHTML(project.shortDesc)}</p>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">The Engineering Problem</h3>
        <p class="modal-section-content">${this.escapeHTML(project.details.problem)}</p>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">Technical Approach & Implementation</h3>
        <p class="modal-section-content">${this.escapeHTML(project.details.approach)}</p>
      </div>

      ${workflowSteps ? `
        <div class="modal-section">
          <h3 class="modal-section-title">System Architecture Flow</h3>
          <div class="project-workflow" style="margin-top: 0.5rem;">
            <div class="workflow-steps">${workflowSteps}</div>
          </div>
        </div>
      ` : ''}

      <div class="modal-section">
        <h3 class="modal-section-title">Architecture & Mechanics</h3>
        <p class="modal-section-content">${this.escapeHTML(project.details.architecture)}</p>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">Key Implementation Highlights</h3>
        <div class="modal-section-content">
          <ul>${highlightsList}</ul>
        </div>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">Verified Results & Efficacy</h3>
        <p class="modal-section-content">${this.escapeHTML(project.details.results)}</p>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">Technologies & Stack Used</h3>
        <div class="project-tech-tags" style="margin-top: 0.5rem;">
          ${techBadges}
        </div>
      </div>

      <div class="modal-actions">
        ${project.github ? `
          <a href="${this.escapeHTML(project.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span>Explore on GitHub</span>
          </a>
        ` : ''}
        <button type="button" class="btn btn-secondary" onclick="projectModal.close()">
          <span>Close Details</span>
        </button>
      </div>
    `;
  }

  escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
