export const mapDispatch = actions => dispatch => {
  return Object.entries(actions).reduce(
    (map, [ name, func ]) => {
      return {
        ...map,
        [name]: (...args) => dispatch(func(...args))
      }
    }, {}
  )
}
