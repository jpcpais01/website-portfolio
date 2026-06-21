import './style.css'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

/* ==========================================================================
   Lenis Smooth Scroll
   ========================================================================== */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

/* ==========================================================================
   Custom Lag-Free Interactive Cursor
   ========================================================================== */
const cursor = document.getElementById('custom-cursor')
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
let cursorPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
})

// Lerp loop for fluid motion
function animateCursor() {
  const lerpFactor = 0.15
  cursorPos.x += (mouse.x - cursorPos.x) * lerpFactor
  cursorPos.y += (mouse.y - cursorPos.y) * lerpFactor

  if (cursor) {
    cursor.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) translate(-50%, -50%)`
  }
  requestAnimationFrame(animateCursor)
}
animateCursor()

// Interactive Cursor Classes on Hover
const interactiveElements = document.querySelectorAll('a, button, [data-magnetic-card]')

interactiveElements.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    if (el.tagName === 'A' || el.tagName === 'BUTTON') {
      cursor?.classList.add('interactive')
    } else {
      cursor?.classList.add('hovered')
    }
  })

  el.addEventListener('mouseleave', () => {
    cursor?.classList.remove('interactive')
    cursor?.classList.remove('hovered')
  })
})

/* ==========================================================================
   Magnetic Interactions
   ========================================================================== */
// Magnetic links & buttons
const magneticElements = document.querySelectorAll('[data-magnetic]')

magneticElements.forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const strength = 0.35 // strength of the magnet pull

    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    })
  })

  el.addEventListener('mouseleave', () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    })
  })
})

// Magnetic project cards with subtle tilt
const projectCards = document.querySelectorAll('[data-magnetic-card]')

projectCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    // Subtle rotation and tilt
    const tiltX = (y / rect.height) * 4 // max tilt 4 degrees
    const tiltY = -(x / rect.width) * 4

    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out',
    })
  })

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
  })
})

/* ==========================================================================
   GSAP Cinematic Entry Animation
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
  // Hero headline text reveal
  gsap.to('.reveal-text', {
    y: 0,
    stagger: 0.08,
    duration: 1.4,
    ease: 'power4.out',
    delay: 0.2,
  })

  // Fade-in subtle indicators & elements
  gsap.from('header, #hero p, #hero a', {
    opacity: 0,
    y: 20,
    stagger: 0.15,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.8,
  })
})

/* ==========================================================================
   Scroll reveals (GSAP ScrollTrigger)
   ========================================================================== */
// Selected work cards reveal
gsap.utils.toArray('.project-card').forEach((card) => {
  gsap.fromTo(card, 
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    }
  )
})

// Connect section reveal
gsap.fromTo('#connect h2, #connect div',
  { opacity: 0, y: 30 },
  {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#connect',
      start: 'top 80%',
    }
  }
)

/* ==========================================================================
   Copy Direct Email Functionality
   ========================================================================== */
const copyBtn = document.getElementById('copy-email-btn')
const copyStatus = document.getElementById('copy-status')

if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('hello@joaopais.dev')
      .then(() => {
        if (copyStatus) {
          copyStatus.style.opacity = '1'
          setTimeout(() => {
            copyStatus.style.opacity = '0'
          }, 2000)
        }
      })
      .catch((err) => {
        console.error('Failed to copy email:', err)
      })
  })
}
