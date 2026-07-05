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

// Function to open CV in new tab and trigger download
function openAndDownloadCV(event) {
  event.preventDefault()
  const cvUrl = event.currentTarget.getAttribute('href')
  
  // Open in new tab
  window.open(cvUrl, '_blank')
  
  // Trigger download after a small delay
  setTimeout(() => {
    const link = document.createElement('a')
    link.href = cvUrl
    link.download = 'FARHANNULHAKIM_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, 500)
}
