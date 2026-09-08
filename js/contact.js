/**
 * Contact Form Validation & Toast Notification System
 * Mahammad Irfan Shaik — ML Engineer & Data Scientist Portfolio
 */

class ContactManager {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.toastContainer = document.getElementById('toastContainer');
    this.statusBox = document.getElementById('formStatusBox');

    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Clear field error on typing
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        this.clearFieldError(input);
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      this.showFieldError(nameInput, 'Please enter your name.');
      isValid = false;
    } else {
      this.clearFieldError(nameInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      this.showFieldError(emailInput, 'Please enter your email address.');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      this.showFieldError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    } else {
      this.clearFieldError(emailInput);
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      this.showFieldError(subjectInput, 'Please enter a message subject.');
      isValid = false;
    } else {
      this.clearFieldError(subjectInput);
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      this.showFieldError(messageInput, 'Please enter your message.');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      this.showFieldError(messageInput, 'Message should be at least 10 characters.');
      isValid = false;
    } else {
      this.clearFieldError(messageInput);
    }

    if (!isValid) return;

    // Disable button and show sending state
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      <span>Preparing message...</span>
    `;

    setTimeout(() => {
      // Create mailto fallback link to ensure 100% real delivery
      const name = encodeURIComponent(nameInput.value.trim());
      const email = encodeURIComponent(emailInput.value.trim());
      const subject = encodeURIComponent(`[Portfolio Inquiry] ${subjectInput.value.trim()}`);
      const body = encodeURIComponent(
        `Hi Mahammad Irfan,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}\n\nBest regards,\n${nameInput.value.trim()}`
      );

      const mailtoUri = `mailto:smdirfan182@gmail.com?subject=${subject}&body=${body}`;

      // Open mail client
      window.location.href = mailtoUri;

      this.showToast('Message formatted! Opening your default email client...', 'success');
      
      if (this.statusBox) {
        this.statusBox.className = 'form-status-box success';
        this.statusBox.textContent = 'Thank you! If your email client did not automatically open, please email me directly at smdirfan182@gmail.com.';
      }

      this.form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 600);
  }

  showFieldError(input, message) {
    input.classList.add('error');
    const errorEl = document.getElementById(`${input.id}Error`);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  clearFieldError(input) {
    input.classList.remove('error');
    const errorEl = document.getElementById(`${input.id}Error`);
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  showToast(message, type = 'success') {
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${type === 'success' 
          ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
          : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'
        }
      </svg>
      <span>${message}</span>
    `;

    this.toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }
}
