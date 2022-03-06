'use strict';

import PopUp from './popup.js'
import Field from './field.js'
import * as sound from './sound.js'

const CARROT_COUNT = 10
const BUG_COUNT = 10
const GAME_DURATION = 10

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

const gameField = new Field(BUG_COUNT, CARROT_COUNT)

gameField.setClickListner(onItemClick)

function onItemClick(item) {
  if(!gameStatus) {
    return
  }
  if(item === 'game__carrot') {
    score++
    updateCarrotLeft()
    if(score === CARROT_COUNT) {
      finishGame('you won!')
    }
  } else if(item === 'game__bug') {
      finishGame('you lost!')
  }
}

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
  sound.playAlert()
  sound.pauseBgm()
}

function replayGame() {
  gameStatus = true
  showPlayBtn()
  showStopIcon()
  startGameTimer(remainingTimeSec)
  gameBanner.hide()
  sound.playBgm()
}

function finishGame(text) {
  if(text === 'you lost!') {
    gameBanner.showWithText(text)
    sound.playBug()
  } else {
    gameBanner.showWithText(text)
    sound.pauseBgm()
    sound.playWin()
  }
  gameStatus = true
  stopGameTimer()
  hidePlayBtn()
  showPlayIcon()
}

function init() {
  carrotLeft.innerText = `${CARROT_COUNT}`
  gameField.init()
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

function updateCarrotLeft() {
  carrotLeft.innerText = CARROT_COUNT - score
}