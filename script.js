// =========================================
// script.js
// JS for each new section gets added below,
// organized into its own clearly labeled
// block so the file stays easy to navigate.
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  // Runs once the HTML is fully loaded.
  // Section-specific init calls will go here.
  initNavbar();
  initAboutTabs();
  initSkillNavLinks();
  initFooterYear();
  initPortfolioPrint();
});

// -----------------------------------------
// NAVIGATION BAR
// -----------------------------------------
function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  // Not every page has a navbar (e.g. project.html uses a floating
  // back button instead), so skip setup if these elements aren't present
  if (!hamburger || !navLinks) return;

  // Toggle the mobile menu open/closed when the hamburger is clicked
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    hamburger.classList.toggle('is-active');

    // Keep aria-expanded in sync for screen readers
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close the mobile menu automatically after a link is tapped,
  // so users aren't stuck looking at an open menu after navigating
  navLinks.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
}

// -----------------------------------------
// ABOUT SECTION — tab switching
// -----------------------------------------
function initAboutTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.tab; // matches the panel's id, minus "tab-"

      // Reset every button and panel to inactive/hidden first
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        panel.setAttribute('hidden', '');
      });

      // Then activate only the clicked button and its matching panel
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(`tab-${targetId}`);
      targetPanel.classList.add('active');
      targetPanel.removeAttribute('hidden');
    });
  });
}

function initSkillNavLinks() {
  document.querySelectorAll('[data-tab-target]').forEach(link => {
    link.addEventListener('click', event => {
      const targetTab = link.dataset.tabTarget;
      const matchingTab = document.getElementById(`tab-btn-${targetTab}`);

      if (!matchingTab) return;

      event.preventDefault();
      matchingTab.click();
      document.getElementById('about').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// -----------------------------------------
// FOOTER — auto-fill current year
// -----------------------------------------
function initFooterYear() {
  const yearSpan = document.getElementById('footer-year');
  yearSpan.textContent = new Date().getFullYear();
}

function initPortfolioPrint() {
  const printButton = document.getElementById('print-portfolio');
  if (!printButton) return;

  printButton.addEventListener('click', () => window.print());
}

