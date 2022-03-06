'use strict';

const playBg = new Audio('sound/bg.mp3')
const winBg = new Audio('sound/game_win.mp3')
const bugBg = new Audio('sound/bug_pull.mp3')
const carrotBg = new Audio('sound/carrot_pull.mp3')
const alertBg = new Audio('sound/alert.wav')

export function playCarrot() {
  playSound(carrotBg)
}

export function playBug() {
  playSound(bugBg)
}

export function playWin() {
  playSound(winBg)
}

export function playAlert() {
  playSound(alertBg)
}

export function playBgm() {
  playSound(playBg)
}

export function pauseBgm() {
  pauseSound(playBg)
}

function playSound(sound) {
  sound.play()
}

function pauseSound(sound) {
  sound.pause()
}