import Cursor from './src/js/cursor'
import './src/js/form'
import './src/js/footer'
import './src/js/sidebar'
import './src/js/animations'

const sidebar = document.querySelector('.sidebar'),
  sidebarbutton = document.querySelector('.sidebar-button'),
  sidebarSections = document.querySelectorAll('.sidebar__section--content')

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), 
})

sidebarbutton.addEventListener('click', () => {
  sidebar.classList[1]
  ? lenis.stop()
  : lenis.start()
})  

sidebarSections.forEach(section => {
  section.addEventListener('click', () => {
    lenis.start()
  })
})

function raf(time){
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

const anchors = document.querySelectorAll('a[href^="#"]')
anchors.forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    lenis.scrollTo(anchor.getAttribute('data-scrollTo'))
  });
})

function isTouchDevice() {
  return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
}

const isTouch = isTouchDevice() 

if (!isTouch) {const cursor = new Cursor(document.querySelector('.cursor'))}

const email = document.querySelector('[data-contact]')
email.addEventListener('click', () => {
  navigator.clipboard.writeText('jusmaliri@gmail.com')
  gsap.to('.email-copied', {autoAlpha: 1})
  gsap.to('.email-copied', {autoAlpha: 0,delay: 1})
})

const preference = window.matchMedia('(prefers-color-schemed: dark)').matches ? 'dark' : 'light';
const buttonMode = document.querySelectorAll('.button-mode');
const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const lightMode = document.querySelectorAll('.button-mode-light'),
    darkMode = document.querySelectorAll('.button-mode-dark')
  if(theme === 'light'){
    darkMode.forEach(button => button.classList.add('button-mode__active'))
    lightMode.forEach(button => button.classList.remove('button-mode__active'))
  }
  else if(theme === 'dark'){
    darkMode.forEach(button => button.classList.remove('button-mode__active'))
    lightMode.forEach(button => button.classList.add('button-mode__active'))
  }
}

buttonMode.forEach(b => { 
  b.addEventListener('click', ()=>{
    let themeButton = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    setTheme(themeButton);
  })
})

setTheme(localStorage.getItem('theme') || preference);

