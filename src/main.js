'use strict';

import PopUp from './popup.js'

const CARROT_COUNT = 10
const BUG_COUNT = 10
const GAME_DURATION = 10

const playBg = new Audio('sound/bg.mp3')
const winBg = new Audio('sound/game_win.mp3')
const bugBg = new Audio('sound/bug_pull.mp3')
const carrotBg = new Audio('sound/carrot_pull.mp3')
const alertBg = new Audio('sound/alert.wav')
const gameField = document.querySelector('.game__field')
const gameFieldRect = gameField.getBoundingClientRect()
const playBtn = document.querySelector('.game__playBtn')
const carrotLeft = document.querySelector('.game__carrotLeft')
const timeLeft = document.querySelector('.game__secBox')

let gameStatus = false
let score = 0
let timer = undefined
let remainingTimeSec

const gameBanner = new PopUp()

gameBanner.setClickListner(() => {
  if(remainingTimeSec > 0 && gameStatus === false) {
    replayGame()
  } else {
    startGame()
  }
})

playBtn.addEventListener('click', (event) => {
  if(gameStatus) {
    stopGame()
  } else {
    startGame()
  }
})

function startGame() {
  gameStatus = true
  score = 0
  playSound(playBg)
  init()
  showPlayBtn()
  showStopIcon()
  showTimerAndScore()
  startGameTimer(GAME_DURATION)
  gameBanner.hide()
}

function stopGame() {
  gameStatus = false
  showPlayIcon()
  hidePlayBtn()
  gameBanner.showWithText('resume')
  stopGameTimer()
}

function replayGame() {
  gameStatus = true
  showPlayBtn()
  showStopIcon()
  startGameTimer(remainingTimeSec)
  gameBanner.hide()
}

function finishGame(text) {
  gameStatus = true
  gameBanner.showWithText(text)
  stopGameTimer()
  hidePlayBtn()
  showPlayIcon()
}

function init() {
  gameField.innerHTML = ''
  addItem('game__bug', BUG_COUNT)
  addItem('game__carrot', CARROT_COUNT)
  carrotLeft.innerText = `${CARROT_COUNT}`
}

function randomNumber(max, min) {
  return Math.floor(Math.random() * (max - min) + min)
}

function addItem(className, count) {
  const x1 = 0
  const y1 = 0
  const x2 = gameFieldRect.width - 50
  const y2 = gameFieldRect.height - 50
  console.log(y1, y2)
  for(let i = 0; i < count; i++) {
    const item = document.createElement('div')
    item.setAttribute('class', className)
    item.style.position = 'absolute'
    const randTop = randomNumber(y2, y1)
    const randLeft = randomNumber(x2, x1)
    item.style.top = `${randTop}px`
    item.style.left = `${randLeft}px`
    gameField.appendChild(item)
  }
}

function showStopIcon() {
  const icon = document.querySelector('.fa-solid')
  icon.classList.add('fa-stop')
  icon.classList.remove('fa-play')
}

function showPlayIcon() {
  const icon = document.querySelector('.fa-solid')
  icon.classList.add('fa-play')
  icon.classList.remove('fa-stop')
}

function showTimerAndScore() {
  timeLeft.style.visibility = 'visible'
  carrotLeft.style.visibility = 'visible'
}

function startGameTimer(time) {
  remainingTimeSec = time
  updateTimerText(remainingTimeSec)
  timer = setInterval(() => {
    if(remainingTimeSec <= 0) {
      clearInterval(timer)
      finishGame('you lost!')
      playBg.pause()
      playSound(alertBg)
      return
    }
    updateTimerText(--remainingTimeSec)
  }, 1000)
}

function stopGameTimer() {
  clearInterval(timer)
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  timeLeft.innerText = `${minutes}:${seconds}`
}

function hidePlayBtn() {
  playBtn.style.visibility = 'hidden'
}

function showPlayBtn() {
  playBtn.style.visibility = 'visible'
}

gameField.addEventListener('click', (event) => {
  if(!gameStatus) {
    return
  }
  const target = event.target
  if(target.matches('.game__carrot')) {
    target.remove()
    score++
    playSound(carrotBg)
    updateCarrotLeft()
    if(score === CARROT_COUNT) {
      finishGame('you won!')
      playBg.pause()
      playSound(winBg)
    }
  } else if(target.matches('.game__bug')) {
    playBg.pause()
    playSound(bugBg)
    playSound(alertBg)
    finishGame('you lost!')
  }
})

function updateCarrotLeft() {
  carrotLeft.innerText = CARROT_COUNT - score
}

function playSound(sound) {
  sound.play()
}