export default {
  isSignedIn: (state) => !!(state && state.token),
  currentSession: (state) => state,
  currentAccount: (state) => state && state.account
}
