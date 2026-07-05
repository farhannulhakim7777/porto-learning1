if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle')
  const navUl = document.querySelector('nav ul')
  const navLinks = document.querySelectorAll('nav ul li a')
  const body = document.body
  const themeToggle = document.getElementById('theme-toggle')

  // Fungsi untuk mengubah tema
  const setTheme = theme => {
    body.setAttribute('data-theme', theme)
    const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon'
    themeToggle.querySelector('i').className = `fas ${icon}`
    localStorage.setItem('theme', theme)
  }

  // Deteksi tema tersimpan atau gunakan light sebagai default
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    setTheme(savedTheme)
  } else {
    setTheme('light')
  }

  // Listener tombol tema
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  })

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar')
    if (window.scrollY > 50) {
      navbar.style.padding = '16px 48px'
      navbar.style.background = 'var(--glass-bg)'
      navbar.style.boxShadow = 'var(--shadow-lg)'
    } else {
      navbar.style.padding = '20px 48px'
      navbar.style.boxShadow = 'none'
    }
  })

  // Toggle Navbar Menu
  if (navToggle && navUl) {
    navToggle.addEventListener('click', () => {
      navUl.classList.toggle('nav-open')
      navToggle.classList.toggle('active')
    })
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        navUl.classList.remove('nav-open')
        navToggle.classList.remove('active')
      }
    })
  })
})
