const navToggle = document.querySelector('.nav-toggle');
const navUl = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
  navUl.classList.toggle('nav-open');
  navToggle.classList.toggle('active');
});

// Optional: close menu when link clicked (mobile UX)
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 700) {
      navUl.classList.remove('nav-open');
      navToggle.classList.remove('active');
    }
  });
});





