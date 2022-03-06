'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up')
    this.popUpRefresh = document.querySelector('.pop-up_btn')
    this.popUpText = document.querySelector('.pop-up_text')
    this.popUpRefresh.addEventListener('click', () => {
      this.onClick && this.onClick()
    })
  }

  setClickListner(onClick) {
    this.onClick = onClick
  }

  showWithText(text) {
    this.popUp.style.visibility = 'visible'
    this.popUpText.innerText = text
  }

  hide() {
    this.popUp.style.visibility = 'hidden'
  }
}