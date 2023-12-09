import { attachListener } from './helpers.mjs'

const playPauseBtn = document.querySelector('.play-pause-btn')
const stopBtn = document.querySelector('.stop-btn')

const controls = {
  playPauseBtn,
  stopBtn
}

attachListener(controls)

playPauseBtn.addEventListener('click', () => {
  // todo
})

stopBtn.addEventListener('click', () => {
  // ...
})

playPauseBtn.addEventListener('fullscreenchange', () => {
  // todo#2
})

playPauseBtn.addEventListener('fullscreenerror', () => {
  // todo#3
})
