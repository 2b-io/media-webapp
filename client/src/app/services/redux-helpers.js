export const mapDispatch = actions => dispatch => {
  console.log('actions',actions);
  console.log('dispatch',dispatch);
  return Object.entries(actions).reduce(
    (map, [ name, func ]) => {
      return {
        ...map,
        [name]: (...args) => dispatch(func(...args))
      }
    }, {}
  )
}
