import { lerp, getMousePos, getSiblings } from "./utils"

let mouse = { x: 0, y: 0 }
window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)))
export default class Cursor {
  constructor(el) {
    this.Cursor = el
    this.Cursor.style.opacity = 0
    this.Item = document.querySelectorAll(".projects-item")
    this.Hero = document.querySelector(".main__projects")
    this.bounds = this.Cursor.getBoundingClientRect()
    this.cursorConfigs = {
      x: { previous: 0, current: 0, amt: 0.15 },
      y: { previous: 0, current: 0, amt: 0.15 },
    }
    this.onMouseMoveEv = () => {
      this.cursorConfigs.x.previous = this.cursorConfigs.x.current = mouse.x
      this.cursorConfigs.y.previous = this.cursorConfigs.y.previous = mouse.y

      gsap.to(this.Cursor, {duration: 1, ease: "power2.out", opacity: 1,})
      this.onScaleMouse()
      requestAnimationFrame(() => this.render())
      window.removeEventListener("mousemove", this.onMouseMoveEv)
    }
    window.addEventListener("mousemove", this.onMouseMoveEv)
  }

  onScaleMouse() {
    this.Item.forEach((link) => {
      if (link.matches(":hover")) {
        this.setImage(link)
        this.ScaleCursor(this.Cursor.children[0], 0.8)
      }
      link.addEventListener("mouseenter", () => {
        this.setImage(link)
        this.ScaleCursor(this.Cursor.children[0], 0.8)
      })
      link.addEventListener("mouseleave", () => {
        this.ScaleCursor(this.Cursor.children[0], 0)
      })
    })
  }

  setImage(el) {
    let src = el.getAttribute("data-image")
    let image = document.querySelector(`#${src}`)
    let siblings = getSiblings(image)
    if (image.id == src) {
      gsap.set(image, { zIndex: 4, opacity: 1 })
      siblings.forEach((i) => {
        gsap.set(i, { zIndex: 1, opacity: 0 })
      })
    }
  }

  ScaleCursor(el, amount) {gsap.to(el, {duration: 0.3, scale: amount, ease: "power2.out",})}
  render() {
    this.cursorConfigs.x.current = mouse.x
    this.cursorConfigs.y.current = mouse.y
    for (const key in this.cursorConfigs) {
      this.cursorConfigs[key].previous = lerp(
        this.cursorConfigs[key].previous,
        this.cursorConfigs[key].current,
        this.cursorConfigs[key].amt
      )
    }
    this.Cursor.style.transform = `translateX(${this.cursorConfigs.x.previous}px) translateY(${this.cursorConfigs.y.previous}px)`
    requestAnimationFrame(() => this.render())
  }
}