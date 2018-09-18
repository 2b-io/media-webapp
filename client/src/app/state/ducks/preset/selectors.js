export default {
  findPreset: (state, identifier, contentType) => {
    if (!state.presets[ identifier ]) {
      return
    }
    return state.presets[ identifier ][ contentType ]
  }
}
