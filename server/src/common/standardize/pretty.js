const standardizePretty = (input, slug) => {
  const part = input.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/, '')
  const pattern = `/p/${ slug }/${ part }*`
  return pattern
}
export default standardizePretty
