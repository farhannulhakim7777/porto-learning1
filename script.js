/* ── CURSOR ── */
const cursorDot  = document.getElementById('cursorDot')
const cursorRing = document.getElementById('cursorRing')

let mouseX = 0, mouseY = 0
let ringX = 0, ringY = 0

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
  if (cursorDot) {
    cursorDot.style.left = mouseX + 'px'
    cursorDot.style.top  = mouseY + 'px'
  }
})

function animateRing() {
  if (cursorRing) {
    ringX += (mouseX - ringX) * 0.12
    ringY += (mouseY - ringY) * 0.12
    cursorRing.style.left = ringX + 'px'
    cursorRing.style.top  = ringY + 'px'
  }
  requestAnimationFrame(animateRing)
}
animateRing()

// Expand ring on interactive elements
document.querySelectorAll('a, button, .project-card, .brand-card, .stat-block, .contact-channel, .skill-row').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('expand'))
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('expand'))
})

/* ── NAVBAR ── */
const navbar    = document.getElementById('navbar')
const navToggle = document.getElementById('navToggle')
const navMenu   = document.getElementById('navMenu')
const navLinks  = document.querySelectorAll('#navMenu a')

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
  updateActiveLink()
})

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('nav-open')
  navToggle.classList.toggle('active')
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('nav-open')
    navToggle.classList.remove('active')
    document.body.style.overflow = ''
  })
})

/* ── ACTIVE LINK ON SCROLL ── */
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]')
  let current = ''
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top
    if (top <= 120) current = sec.id
  })
  navLinks.forEach(link => {
    link.classList.remove('active')
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active')
    }
  })
}

/* ── REVEAL ON SCROLL ── */
const reveals = document.querySelectorAll('.reveal')

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

reveals.forEach(el => revealObserver.observe(el))

/* ── SKILLS TABS ── */
const skillTabs   = document.querySelectorAll('.skill-tab')
const skillPanels = document.querySelectorAll('.skills-panel')

skillTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const panelId = 'panel-' + tab.dataset.panel

    skillTabs.forEach(t => t.classList.remove('active'))
    skillPanels.forEach(p => p.classList.remove('active'))

    tab.classList.add('active')
    const target = document.getElementById(panelId)
    if (target) target.classList.add('active')
  })
})

/* ── PROJECTS HORIZONTAL SCROLL ── */
const trackWrap = document.getElementById('projectsTrack')
const projPrev  = document.getElementById('projPrev')
const projNext  = document.getElementById('projNext')

if (trackWrap && projNext && projPrev) {
  const scrollAmount = 400

  projNext.addEventListener('click', () => {
    trackWrap.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  })

  projPrev.addEventListener('click', () => {
    trackWrap.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  })

  // Mouse drag scroll
  let isDown = false
  let startX
  let scrollLeft

  trackWrap.addEventListener('mousedown', (e) => {
    isDown = true
    trackWrap.style.cursor = 'grabbing'
    startX = e.pageX - trackWrap.offsetLeft
    scrollLeft = trackWrap.scrollLeft
  })

  trackWrap.addEventListener('mouseleave', () => {
    isDown = false
    trackWrap.style.cursor = ''
  })

  trackWrap.addEventListener('mouseup', () => {
    isDown = false
    trackWrap.style.cursor = ''
  })

  trackWrap.addEventListener('mousemove', (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - trackWrap.offsetLeft
    const walk = (x - startX) * 1.5
    trackWrap.scrollLeft = scrollLeft - walk
  })
}

/* ── CV DOWNLOAD ── */
function openAndDownloadCV(event) {
  event.preventDefault()
  const url = event.currentTarget.getAttribute('href')
  window.open(url, '_blank')
  setTimeout(() => {
    const a = document.createElement('a')
    a.href = url
    a.download = 'FARHANNULHAKIM_CV.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, 500)
}
