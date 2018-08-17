export default {
  dialog: (state, name) => state.dialogs[ name ],
  hasShownDialogs: (state) => Object.values(state.dialogs).some(Boolean)
}
