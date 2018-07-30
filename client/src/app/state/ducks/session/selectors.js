export default {
  isSignedIn: state => !!state.info,
  currentSession: state => state.info,
  currentAcount: state => state.info && state.info.account
}
