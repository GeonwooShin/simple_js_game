'use strict'

import Field from './field.js'
import PopUp from './popup.js'
import * as sound from './sound.js'

const gameBanner = new PopUp()

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration
    this.carrotCount = carrotCount
    this.bugCount = bugCount

    this.gameField = new Field(bugCount, carrotCount)
    this.gameField.setClickListner(this.onItemClick)

    this.gameStatus = false
    this.score = 0
    this.timer = undefined
    this.remainingTimeSec = gameDuration

    this.icon = document.querySelector('.fa-solid')
    this.playBtn = document.querySelector('.game__playBtn')
    this.carrotLeft = document.querySelector('.game__carrotLeft')
    this.timeLeft = document.querySelector('.game__secBox')
    this.playBtn.addEventListener('click', () => {
      if(this.gameStatus) {
        this.stop()
      } else {
        this.start()
      }
    })
  }

  setStopListner(onGameStop) {
    this.onGameStop = onGameStop
  }

  resumeOrRestart() {
    if(this.remainingTimeSec > 0 && this.gameStatus === false) {
      this.replay()
    } else {
      this.start()
    }
  }

  onItemClick = (item) => {
    if(!this.gameStatus) {
      return
    }
    if(item === 'game__carrot') {
      this.score++
      this._updateCarrotLeft()
      if(this.score === this.carrotCount) {
        this.finish('you won!')
      }
    } else if(item === 'game__bug') {
        this.finish('you lost!')
    }
  }

  start() {
    this.gameStatus = true
    this.score = 0
    this.remainingTimeSec = this.gameDuration
    gameBanner.hide()
    this._init()
    this._showPlayBtn()
    this._showStopIcon()
    this._showTimerAndScore()
    this._startGameTimer(this.gameDuration)
  }

  stop() {
    this.gameStatus = false
    this._showPlayIcon()
    this._hidePlayBtn()
    this.onGameStop && this.onGameStop('resume?')
    this._stopGameTimer()
    sound.playAlert()
    sound.pauseBgm()
  }

  replay() {
    this.gameStatus = true
    gameBanner.hide()
    this._showPlayBtn()
    this._showStopIcon()
    this._startGameTimer(this.remainingTimeSec)
    sound.playBgm()
  }

  finish(text) {
    if(text === 'you lost!') {
      this.onGameStop && this.onGameStop(text)
      sound.playBug()
    } else {
      this.onGameStop && this.onGameStop(text)
      sound.pauseBgm()
      sound.playWin()
    }
    this.gameStatus = true
    this._stopGameTimer()
    this._hidePlayBtn()
    this._showPlayIcon()
  }

  _showStopIcon() {
    this.icon.classList.add('fa-stop')
    this.icon.classList.remove('fa-play')
  }

  _showPlayIcon() {
    this.icon.classList.add('fa-play')
    this.icon.classList.remove('fa-stop')
  }

  _showTimerAndScore() {
    this.timeLeft.style.visibility = 'visible'
    this.carrotLeft.style.visibility = 'visible'
  }

  _hidePlayBtn() {
    this.playBtn.style.visibility = 'hidden'
  }

  _showPlayBtn() {
    this.playBtn.style.visibility = 'visible'
  }

  _updateCarrotLeft() {
    this.carrotLeft.innerText = this.carrotCount - this.score
  }

  _startGameTimer() {
    this._updateTimerText(this.remainingTimeSec)
    this.timer = setInterval(() => {
      if(this.remainingTimeSec <= 0) {
        clearInterval(this.timer)
        this.finish('you lost!')
        return
      }
      this._updateTimerText(--this.remainingTimeSec)
    }, 1000)
  }

  _stopGameTimer() {
    clearInterval(this.timer)
  }

  _updateTimerText(time) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    this.timeLeft.innerText = `${minutes}:${seconds}`
  }

  _init() {  
    this.carrotLeft.innerText = `${this.carrotCount}`
    this.gameField.init()
  }

}