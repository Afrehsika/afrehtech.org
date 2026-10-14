/**
 * Afreh Technologies — Main JavaScript
 * Handles Navigation, Mobile Menu, Project Filtering, FAQ Accordion, and Contact Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside or clicking any nav link
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Header Scroll Effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      if (trigger) {
        trigger.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');
          // Close others for clean single-expand accordion
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              otherItem.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
            }
          });

          if (isOpen) {
            item.classList.remove('active');
            trigger.setAttribute('aria-expanded', 'false');
          } else {
            item.classList.add('active');
            trigger.setAttribute('aria-expanded', 'true');
          }
        });
      }
    });
  }

  // 4. Project Portfolio Filtering (for projects.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Contact Form Handler (for contact.html)
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const service = document.getElementById('service')?.value;
      const message = document.getElementById('message')?.value.trim();
      const phone = document.getElementById('phone')?.value.trim();

      // Basic client-side validation
      if (!name || !email || !message) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill out all required fields (Name, Email, and Project Details).';
        formStatus.style.display = 'block';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please provide a valid email address.';
        formStatus.style.display = 'block';
        return;
      }

      // Display real confirmation state with quick action buttons
      formStatus.className = 'form-status success';
      formStatus.innerHTML = `
        <strong>Thank you, ${escapeHtml(name)}!</strong><br>
        Your enquiry regarding <em>${escapeHtml(service || 'General Tech Solutions')}</em> has been compiled.<br>
        A direct email has been prepared for <strong>info@afrehtech.org</strong>. You can also contact our team directly via phone at <strong>+233 55 054 5381</strong>.
      `;
      formStatus.style.display = 'block';

      // Prepare mailto link as reliable static fallback
      const mailtoSubject = encodeURIComponent(`Project Enquiry: ${service || 'Software Development'} - ${name}`);
      const mailtoBody = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nService: ${service || 'General'}\n\nProject Details:\n${message}`
      );
      
      // Prompt user or open mail client
      setTimeout(() => {
        window.location.href = `mailto:info@afrehtech.org?subject=${mailtoSubject}&body=${mailtoBody}`;
      }, 1000);

      contactForm.reset();
    });
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.innerText = string;
    return div.innerHTML;
  }
});
