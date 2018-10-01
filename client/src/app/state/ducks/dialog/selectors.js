export default {
  isDialogActive: (state, name) => !!state[ name ],
  dialogParams: (state, name) => state,
  dialog: (state, name) => null,
  hasShownDialogs: (state) => null
}
