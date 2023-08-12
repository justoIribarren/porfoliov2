const sidebarButton = document.querySelector('.sidebar-button'),
  heroTitle = document.querySelector('.hero__text-1'),
  sidebarSections = document.querySelectorAll('.sidebar__section--content'),
  hoverBorders = document.querySelectorAll('.sidebar__section--content .hover-border'),
  sidebar = document.querySelector('.sidebar')

  const hideSidebar = (tl) => {
  gsap.set('.sidebar__section--content', {color: 'var(--font-inv-1)'})
  gsap.to(hoverBorders, .2, {width: 0})
  tl.to('[data-sidebar__button]', .3, { yPercent: 100}, '-=0.3')
  tl.to('[data-sidebar__links]', .3, {yPercent: 450}, '-=0.2')
  tl.to('[data-sidebar__logo]', .4, {yPercent: 100}, '-=0.3')
  tl.to('.sidebar', 0.2, {autoAlpha: 0}, '-=0.1')
}
const showSidebar = (tl) => {
  gsap.set('[data-sidebar__links]', {yPercent: 0})
  gsap.set('[data-sidebar__logo]', {yPercent: 0})
  gsap.set('[data-sidebar__button]', {yPercent: 0})
  gsap.set('.sidebar__section--active', {color: 'var(--font-inv)'})
  gsap.set(hoverBorders, {width: 0})
  tl.to('.sidebar', {
    autoAlpha: 1,
    duration: 0.3,
  })
  tl.from('[data-sidebar__links]', .75, {
    yPercent: 500,
    stagger: {amount: .1 },
  }, '-=0.5')
  tl.from('[data-sidebar__logo]', .75, {
    yPercent: 100,
  }, '-=0.3')
  tl.to('.sidebar__section--active .hover-border', .3, {width: '100%'}, '-=0.3')
  tl.from('[data-sidebar__button]', .75, {
    stagger: {amount: .1 },
    yPercent: 100,
  }, '-=0.5')
  tl.to('.sidebar', {pointerEvents: 'all'})
}

const sectionMouseLeave = (el, el2) => {
  gsap.to(el, {
    duration: .3,
    width: 0,
    ease: 'power2.inOut'
  })
  gsap.to(el2, {duration: .1,color: 'var(--font-inv-1)',ease: 'power2.inOut'})
}
const sectionMouseEnter = (el, el2) => {
  gsap.to(el, {
    duration: .3,
    width: '100%',
    ease: 'power2.inOut'
  })
  gsap.to(el2, {
    duration: .1,
    color: 'var(--font-inv)',
    ease: 'power2.inOut'
  })
}

function verificarVisibilidad(entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) sidebarButton.classList.add('sidebar-button__show')
    else if (!sidebarButton.classList[2]) sidebarButton.classList.remove('sidebar-button__show')
  })
}

const observer = new IntersectionObserver(verificarVisibilidad, {})

observer.observe(heroTitle)
  
let tl = gsap.timeline({defaults: {ease: 'power2.inOut'}})
  
sidebarButton.addEventListener('click', () => {
  if (!sidebarButton.classList[2]) {
    sidebar.classList.add('sidebar-active')
    sidebarButton.classList.add('sidebar-button__active')
    showSidebar(tl) 
  } else {
    sidebar.classList.remove('sidebar-active')
    sidebarButton.classList.remove('sidebar-button__active')
    hideSidebar(tl) 
  }
})

sidebarSections.forEach(section => {
  section.addEventListener('click', () => {
    sidebarButton.classList.remove('sidebar-button__active')
    hideSidebar(tl)
  })
  section.addEventListener('mouseenter', () => {
    const border = section.children[0].children[1]
    if (!section.classList.contains('sidebar__section--active')) {
      sectionMouseLeave('.sidebar__section--content .hover-border', sidebarSections)
    }
    sectionMouseEnter(border, section)
  })

  section.addEventListener('mouseleave', () => {
    const border = section.children[0].children[1]
    if (!section.classList.contains('sidebar__section--active')) {
      sectionMouseLeave(border, section)
    }
  })
  
  document.querySelector('.sidebar__section').addEventListener('mouseleave', () => {      
    sectionMouseEnter('.sidebar__section--active .hover-border', '.sidebar__section--active')
  })
})