const heroInit = () => {
  gsap.set('[data-animation__hero]', {width: 0})
  gsap.set('[data-animation__projects]', {width: 0})
  gsap.set('[data-animation__contact]', {width: 0})
  showHero()
}
const showHero = () => {
  const mySplit = new SplitType('[data-split_text-init]', {types: 'words'}),
  split = mySplit.words,
  mySplit2 = new SplitType('[data-split_text-init-2]', {types: 'chars'}),
  split2 = mySplit2.chars

  gsap.timeline({defaults:{ ease: 'power4.out'}})
  .from(split, {
    yPercent: 400,
    duration: 1,
    stagger: 0.1,
  })
  .from(split2, {
    yPercent: 400,
    duration: 1,
    delay: -.75,
    stagger: 0.01,
  }).to('[data-animation__hero]', {
    width: '100%',
    duration: 1.25,
    delay: -1,
    stagger: {
      amount: 0.1
    },
  })
}

const showProjects = () => {
  let tl = gsap.timeline({paused: true, defaults: { ease: 'power4.out'}})
  tl.from('[data-animation__projects--title]', {
    yPercent: 200,
    duration: 0.5,
  }).to('[data-animation__projects]', {
    width: '100%',
    duration: 1.25,
    delay: -0.5
  })
  ScrollTrigger.create( {
    trigger: '.main__projects',
    start:  'top 60%',
    onEnter: () => tl.play(),
  })
}

const showContact = () => {
  let tl = gsap.timeline({paused: true, ease: 'power4.out'})
  tl.from('[data-animation__contact--title]', {
    yPercent: 200,
    duration: 0.5,
  }).to('[data-animation__contact]', {
    width: '100%',
    duration: 1.25,
    delay: -0.5
  })
  ScrollTrigger.create( {
    trigger: '.main__contact',
    start:  'top 65%',
    onEnter: () => tl.play(),
  })
}

const sidebarInit = () => {gsap.set('.sidebar', {autoAlpha: 0})}



window.onload = () => {

  heroInit()
  showProjects()
  showContact()
  sidebarInit()
}