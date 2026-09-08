/**
 * Contact & Notification Manager
 * Mahammad Irfan Shaik — ML Engineer & Data Scientist Portfolio
 * Provides toast notifications and direct communication helpers
 */

class ContactManager {
  constructor() {
    this.toastContainer = document.getElementById('toastContainer');
    this.init();
  }

  init() {
    // Setup toast container if missing
    if (!this.toastContainer) {
      const container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
      this.toastContainer = container;
    }
  }

  /**
   * Safe helper to re-trigger reveal animations when dynamic content loads
   */
  initReveal() {
    const reveals = document.querySelectorAll('.reveal:not(.revealed)');
    reveals.forEach(el => el.classList.add('revealed'));
  }

  /**
   * Displays an elegant feedback toast notification
   * @param {string} message - Text to show in toast
   * @param {'success' | 'info' | 'error'} type - Notification style
   */
  showToast(message, type = 'success') {
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>';
    } else if (type === 'info') {
      iconSvg = '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>';
    } else {
      iconSvg = '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>';
    }

    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        ${iconSvg}
      </svg>
      <span>${message}</span>
    `;

    this.toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 4000);
  }
}
