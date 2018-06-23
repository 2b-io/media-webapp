export default func => func ?
  (e, ...args) => {
    if (e.preventDefault) {
      e.preventDefault()
    }

    func(e, ...args)
  } : null
