import './style.css'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

/* ==========================================================================
   Translations (Default: European Portuguese)
   ========================================================================== */
const translations = {
  pt: {
    status: "Disponível para projetos selecionados",
    status_mobile: "Disponível",
    location: "Sediado em Portugal",
    intro_label: "Programador & Designer Web — Portugal",
    hero_title: "Crio websites modernos para o seu negócio.",
    value_prop: "Sou o João Pais. Em baixo encontra alguns dos websites que já criei. Clique em qualquer projeto para o abrir e ver o site real.",
    cta_view_work: "Ver os meus trabalhos",
    cta_contact: "Contactar-me",
    visit_site: "Abrir website",
    work_label: "Os Meus Trabalhos",
    work_title: "Websites que criei",
    work_subtitle: "Clique num projeto para abrir o website real",
    concept: "CONCEITO",
    culture_ecom: "CULTURA & E-COM",
    brand_exp: "EXPERIÊNCIA DE MARCA",
    tech_platform: "PLATAFORMA TECNOLÓGICA",
    gastronomy: "GASTRONOMIA",
    picanha_desc: "Uma experiência digital de marca premium e portal de reservas online para uma steakhouse de elite, com ênfase em fotografia e tipografia de alto contraste.",
    picanha_role: "Dev Criativo / Direção de Arte",
    musicalia_desc: "Um hub conceptual que funde a cultura de design com comércio eletrónico, oferecendo um catálogo de equipamentos de áudio de alta fidelidade e um layout imersivo inspirado em vinil.",
    musicalia_role: "Engenheiro de Frontend Principal",
    acai_desc: "Uma aplicação web de marca vibrante à beira-mar, com carregamento rápido de páginas, animações dinâmicas de frutas e uma montra de menu visual e intuitiva.",
    acai_role: "Arquiteto Criativo Principal",
    arcane_desc: "Um portal SaaS hiper-minimalista com estética premium de modo escuro, trocas seguras de tokens e uma lógica de layout extremamente limpa.",
    arcane_role: "Programador Criativo Full-Stack",
    sabores_desc: "Uma elegante montra gastronómica que capta a tradição, cores e texturas do património culinário de Lisboa num formato editorial limpo.",
    sabores_role: "Designer Interativo e Programador",
    meta_role: "Função",
    meta_stack: "Tecnologias",
    meta_year: "Ano",
    connect_label: "Contacto",
    connect_title: "Precisa de um website? Vamos conversar.",
    connect_subtitle: "Envie-me um email e respondo normalmente no mesmo dia. Sem compromisso.",
    direct_contact: "Contacto Direto",
    copy_email: "Copiar Email",
    copied: "Email copiado!",
    socials: "Redes Sociais",
    cv: "Currículo / CV",
    fresh_brand: "MARCA FRESCA",
    frutas_desc: "Uma experiência digital orgânica para uma marca de frutas frescas do campo, com layouts limpos, paleta natural e uma presença de marca que transmite autenticidade e frescura.",
    frutas_role: "Dev Criativo / Branding Digital",
    footer_copy: "© 2026 João Pais — Criado em Portugal // Disponível para todo o mundo",
    footer_motto: "DESENHADO COM PAIXÃO, ENTREGUE COM CÓDIGO"
  },
  en: {
    status: "Available for select freelance projects",
    status_mobile: "Available",
    location: "Based in Portugal",
    intro_label: "Web Developer & Designer — Portugal",
    hero_title: "I build modern websites for your business.",
    value_prop: "I'm João Pais. Below are some of the websites I've already built. Click any project to open it and see the live site.",
    cta_view_work: "See my work",
    cta_contact: "Contact me",
    visit_site: "Open website",
    work_label: "My Work",
    work_title: "Websites I've built",
    work_subtitle: "Click a project to open the live website",
    concept: "CONCEPT",
    culture_ecom: "CULTURE & E-COM",
    brand_exp: "BRAND EXPERIENCE",
    tech_platform: "TECH PLATFORM",
    gastronomy: "GASTRONOMY",
    picanha_desc: "A premium digital brand experience and online reservations portal for an elite steakhouse, emphasizing high-contrast photography and typography.",
    picanha_role: "Creative Dev / Art Direction",
    musicalia_desc: "A conceptual hub merging design culture with e-commerce, offering high-fidelity audio equipment cataloging and an immersive, vinyl-inspired layout.",
    musicalia_role: "Lead Frontend Engineer",
    acai_desc: "A vibrant, sun-drenched beachside brand web application featuring rapid page loads, slick fruit animations, and a seamless visual menu showcase.",
    acai_role: "Lead Creative Architect",
    arcane_desc: "A hyper-minimalist SaaS portal with high-end dark mode aesthetics, secure token exchanges, and extremely clean layout logic.",
    arcane_role: "Full-Stack Creative Developer",
    sabores_desc: "An elegant gastronomic showcase capturing the tradition, colors, and textures of Lisbon's culinary heritage under a clean editorial format.",
    sabores_role: "Interactive Designer & Developer",
    meta_role: "Role",
    meta_stack: "Stack",
    meta_year: "Year",
    connect_label: "Contact",
    connect_title: "Need a website? Let's talk.",
    connect_subtitle: "Send me an email — I usually reply the same day. No commitment.",
    direct_contact: "Direct Contact",
    copy_email: "Copy Email",
    copied: "Email copied to clipboard!",
    socials: "Social Connections",
    cv: "Resume / CV",
    fresh_brand: "FRESH BRAND",
    frutas_desc: "An organic digital experience for a fresh field-to-table fruit brand, with clean layouts, a natural color palette, and brand presence that communicates authenticity and freshness.",
    frutas_role: "Creative Dev / Digital Branding",
    footer_copy: "© 2026 João Pais — Built in Portugal // Working worldwide",
    footer_motto: "DESIGNED WITH PASSION, DELIVERED WITH CODE"
  }
}

// Current active language (Default: Portuguese)
let currentLang = localStorage.getItem('portfolio-lang') || 'pt'

/* ==========================================================================
   Text Splitting Logic (Solves Layout Overflows)
   ========================================================================== */
function splitTextIntoSpans(element) {
  const text = element.innerText.trim()
  element.innerHTML = ''

  // Make the heading a flex-wrap container so words tile onto new lines
  // naturally on any screen width — no fixed line breaks needed
  element.style.display = 'flex'
  element.style.flexWrap = 'wrap'
  element.style.alignItems = 'flex-end'
  element.style.columnGap = '0.2em'
  element.style.rowGap = '0'

  const words = text.split(/\s+/)
  words.forEach((word) => {
    // Outer clip container — hides the inner span while it's below the fold
    const outer = document.createElement('span')
    outer.className = 'word-outer'

    const inner = document.createElement('span')
    inner.className = 'reveal-text'

    // Words wrapped in * are rendered in serif italic lowercase
    if (word.startsWith('*') && word.endsWith('*')) {
      inner.classList.add('font-serif', 'italic', 'font-light', 'normal-case', 'tracking-normal', 'text-zinc-300')
      inner.style.textTransform = 'none'
      inner.innerText = word.slice(1, -1)
    } else {
      inner.innerText = word
    }

    outer.appendChild(inner)
    element.appendChild(outer)
  })
}

/* ==========================================================================
   DOM Localization
   ========================================================================== */
function updateLanguage(lang) {
  currentLang = lang
  localStorage.setItem('portfolio-lang', lang)
  document.documentElement.setAttribute('lang', lang)

  // Update plain-text elements
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n')
    if (translations[lang][key] !== undefined) {
      el.innerText = translations[lang][key]
    }
  })

  // Update split-text headings
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html')
    if (translations[lang][key] !== undefined) {
      el.innerText = translations[lang][key]
      splitTextIntoSpans(el)
    }
  })

  // Update language switcher button styles
  const btnPt = document.getElementById('lang-pt-btn')
  const btnEn = document.getElementById('lang-en-btn')

  if (lang === 'pt') {
    btnPt?.classList.add('text-accent', 'font-bold')
    btnPt?.classList.remove('text-zinc-500')
    btnEn?.classList.remove('text-accent', 'font-bold')
    btnEn?.classList.add('text-zinc-500')
  } else {
    btnEn?.classList.add('text-accent', 'font-bold')
    btnEn?.classList.remove('text-zinc-500')
    btnPt?.classList.remove('text-accent', 'font-bold')
    btnPt?.classList.add('text-zinc-500')
  }

  // Trigger text animation reveal after DOM update
  animateTextReveals()
}

/* ==========================================================================
   GSAP Animated Reveals
   ========================================================================== */
function animateTextReveals() {
  gsap.killTweensOf('.reveal-text')
  gsap.set('.reveal-text', { y: '110%' })
  gsap.to('.reveal-text', {
    y: '0%',
    stagger: 0.045,
    duration: 1.15,
    ease: 'power4.out',
    delay: 0.1,
  })
}

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

// Lerp loop for fluid cursor motion
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

// Bind hover listeners for interactive elements
function setupCursorHovers() {
  const interactiveElements = document.querySelectorAll('a, button, [data-magnetic-card]')
  interactiveElements.forEach((el) => {
    // Remove existing to prevent multiple bindings if language re-triggers
    el.removeEventListener('mouseenter', onMouseEnter)
    el.removeEventListener('mouseleave', onMouseLeave)
    
    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)
  })
}

function onMouseEnter(e) {
  const el = e.currentTarget
  if (el.tagName === 'A' || el.tagName === 'BUTTON') {
    cursor?.classList.add('interactive')
  } else {
    cursor?.classList.add('hovered')
  }
}

function onMouseLeave() {
  cursor?.classList.remove('interactive')
  cursor?.classList.remove('hovered')
}

/* ==========================================================================
   Magnetic Interactions
   ========================================================================== */
function setupMagneticEffects() {
  const magneticElements = document.querySelectorAll('[data-magnetic]')

  magneticElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const strength = 0.35

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
}

// Magnetic project cards with subtle tilt
function setupCardTilts() {
  const projectCards = document.querySelectorAll('[data-magnetic-card]')

  projectCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
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
}

/* ==========================================================================
   Scroll reveals (GSAP ScrollTrigger)
   ========================================================================== */
function setupScrollReveals() {
  // Selected work cards reveal
  gsap.utils.toArray('.project-card').forEach((card) => {
    gsap.fromTo(card, 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
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
}

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
          copyStatus.innerText = translations[currentLang].copied
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

/* ==========================================================================
   Initialization
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
  // Bind language switcher buttons
  document.getElementById('lang-pt-btn')?.addEventListener('click', () => updateLanguage('pt'))
  document.getElementById('lang-en-btn')?.addEventListener('click', () => updateLanguage('en'))

  // Initialize page translation (PT as default)
  updateLanguage(currentLang)

  // Setup cursor, magnetic, tilt, and scroll reveals
  setupCursorHovers()
  setupMagneticEffects()
  setupCardTilts()
  setupScrollReveals()

  // Fade-in subtle header elements & scroll guide
  gsap.from('header, #hero p, #hero a', {
    opacity: 0,
    y: 20,
    stagger: 0.15,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.6,
  })
})
