export default {
  modal: (state, name) => state.modals[ name ],
  hasShownModals: (state) => Object.values(state.modals).some(Boolean)
}
