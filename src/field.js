'use strict';

const playBg = new Audio('sound/bg.mp3')
const bugBg = new Audio('sound/bug_pull.mp3')
const carrotBg = new Audio('sound/carrot_pull.mp3')
const alertBg = new Audio('sound/alert.wav')

export default
class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount
    this.bugCount = bugCount
    this.gameField = document.querySelector('.game__field')
    this.gameFieldRect = this.gameField.getBoundingClientRect()
    this.gameField.addEventListener('click', this.onClick)
  }

  setClickListner(onItemClick) {
    this.onItemClick = onItemClick
  }

  init() {
    this.gameField.innerHTML = ''
    this._addItem('game__bug', this.bugCount)
    this._addItem('game__carrot', this.carrotCount)
  }

  _addItem(className, count) {
    const x1 = 0
    const y1 = 0
    const x2 = this.gameFieldRect.width - 50
    const y2 = this.gameFieldRect.height - 50
    console.log(y1, y2)
    for(let i = 0; i < count; i++) {
      const item = document.createElement('div')
      item.setAttribute('class', className)
      item.style.position = 'absolute'
      const randTop = randomNumber(y2, y1)
      const randLeft = randomNumber(x2, x1)
      item.style.top = `${randTop}px`
      item.style.left = `${randLeft}px`
      this.gameField.appendChild(item)
    }
  }

  onClick(event) {
    const target = event.target
    if(target.matches('.game__carrot')) {
      target.remove()
      playSound(carrotBg)
      console.log(this.onItemClick)
      this.onItemClick && this.onItemClick('game__carrot')
    } else if(target.matches('.game__bug')) {
      pauseSound(playBg)
      playSound(bugBg)
      playSound(alertBg)
      this.onItemClick && this.onItemClick('game__bug')
    }
  }

}

function playSound(sound) {
  sound.play()
}

function pauseSound(sound) {
  sound.pause()
}

function randomNumber(max, min) {
  return Math.floor(Math.random() * (max - min) + min)
}