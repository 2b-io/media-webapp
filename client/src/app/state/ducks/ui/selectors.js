const emptyObject = {}

export default {
  uiState: (state, path) => state[ path ] || emptyObject
}
