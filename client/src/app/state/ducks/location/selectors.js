export default {
  currentLocation: state => ({
    pathname: state.current,
    key: state.key
  }),
  previousLocation: state => ({
    pathname: state.previous
  })
}
