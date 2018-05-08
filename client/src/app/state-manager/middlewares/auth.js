export default store => next => action => {
  console.log('middleware', action)

  next(action)
}
