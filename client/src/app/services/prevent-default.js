export default func => e => {
  if (e.preventDefault) {
    e.preventDefault()
  }

  func()
}
