export default {
  isSignedIn: state => !!state.info,
  currentSession: state => state.info
}
