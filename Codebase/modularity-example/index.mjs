import { attachPlayPause } from './toggler.mjs'

const state = {
  enabled: false
}

const controls = {
  playPauseBtn: document.querySelector('.play-pause-btn')
}

attachPlayPause(state, controls)
