export default func => (e, ...args) => {
  if (e.preventDefault) {
    e.preventDefault()
  }

  func(e, ...args)
}
