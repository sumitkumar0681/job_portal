// Toggle sidebar and shift page
const menuBtn = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');

if (menuBtn && sidebar && main) {
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    main.classList.toggle('shifted');
  });
}

// Sidebar navigation logic
if (sidebar) {
  const navItems = sidebar.querySelectorAll('li');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetPage = item.getAttribute('data-link');
      if (targetPage) {
        window.location.href = targetPage;
      }
    });
  });
}
