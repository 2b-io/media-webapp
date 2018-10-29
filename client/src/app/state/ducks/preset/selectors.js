export default {
  findPreset: (state, identifier, contentType) => {
    if (!state[ identifier ]) {
      return
    }
    return state[ identifier ][ contentType ]
  },
  presets: (state, identifier) => {
    return state[ identifier ]
  }
}
