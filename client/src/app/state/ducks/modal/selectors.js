export default {
  modal: (state, name) => state[ name ],
  hasShownModals: (state) => Object.values(state).some(Boolean)
}
