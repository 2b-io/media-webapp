export default {
  isSignedIn: state => !!state.info,
  currentSession: state => state.info,
  currentAccount: state => state.info && state.info.account
}
