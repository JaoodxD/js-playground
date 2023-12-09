export function toggle (state) {
  if (state.enabled) {
    state.enabled = false
  } else if (!state.enabled) {
    state.enabled = true
  }
}

export function attachPlayPause (state, controls) {
  controls.playPauseBtn.addEventListener(e => {
    toggle(state)
  })
}
