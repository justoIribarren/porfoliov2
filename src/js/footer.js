const sections = document.querySelectorAll('.section-div__intersection')
const footerSection = document.querySelectorAll('.footer__content--section')
const sidebarActiveSection = document.querySelectorAll('.sidebar__section--content')

gsap.registerPlugin(ScrollTrigger);

const createScrollTrigger = (sec, timeline) => {
  ScrollTrigger.create({
    trigger: `.${sec}`,
    start:  'top 50%',
    end: 'bottom 50%',
    onEnter: () => timeline.play(),
    onEnterBack: () => timeline.play(),
    onLeave: () => timeline.reverse(),
    onLeaveBack: () => timeline.reverse()
  })
}

let tl0 = gsap.timeline({paused: true})
tl0.from('[data-split__footer-Argentina]', {
  yPercent: 200,
  stagger: 0,
  ease: 'expo.inOut',
  duration: 0.5,
  delay: 0.3,
  scrollTrigger: createScrollTrigger( sections[0].classList[0], tl0)
})

let tl1 = gsap.timeline({paused: true})
tl1.from('[data-split__footer-About]', {
  yPercent: 200,
  stagger: 0,
  ease: 'expo.inOut',
  duration: 0.5,
  delay: 0.3,
  scrollTrigger: createScrollTrigger(sections[1].classList[0], tl1)
})

let tl2 = gsap.timeline({paused: true})
tl2.from('[data-split__footer-Projects]', {
  yPercent: 200,
  stagger: 0,
  ease: 'expo.inOut',
  duration: 0.5,
  delay: 0.3,
  scrollTrigger: createScrollTrigger(sections[2].classList[0], tl2)
})

let tl3 = gsap.timeline({paused: true})
tl3.from('[data-split__footer-Contact]', {
  yPercent: 200,
  stagger: 0,
  ease: 'expo.inOut',
  duration: 0.5,
  delay: 0.3,
  scrollTrigger: createScrollTrigger(sections[3].classList[0], tl3)
})

function visibility(entries) {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      sidebarActiveSection.forEach(x => {
        // console.log(x.getAttribute('data-sidebar-info'));
        // console.log(entry.target.getAttribute('data-section-info'));
        x.getAttribute('data-sidebar-info') === entry.target.getAttribute('data-section-info')
          ? x.classList.add('sidebar__section--active')
          : x.classList.remove('sidebar__section--active')
      })          
    }
  })
}
const footerObserver = new IntersectionObserver(visibility, {threshold: 0.5})
sections.forEach(section => {footerObserver.observe(section)})


  