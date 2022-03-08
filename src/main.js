'use strict';

import PopUp from './popup.js'
import Field from './field.js'
import Game from './game.js'

const CARROT_COUNT = 10
const BUG_COUNT = 10
const GAME_DURATION = 10

const gameBanner = new PopUp()
gameBanner.setClickListner(() => {
  game.resumeOrRestart()
})

const game = new Game(GAME_DURATION, CARROT_COUNT, BUG_COUNT)
game.setStopListner((message) => {
  gameBanner.showWithText(message)
})