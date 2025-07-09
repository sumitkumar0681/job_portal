// Toggle sidebar and shift page
const menuBtn = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('show');
  main.classList.toggle('shifted');
});

// Sidebar navigation logic
sidebar.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', () => {
    const targetPage = item.getAttribute('data-link');
    if (targetPage) {
      window.location.href = targetPage;
    }
  });
});
