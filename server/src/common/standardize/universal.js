const standardizeUniversal = (part, slug) => {
  const pattern = `/u/${ slug }?*url=${ part }*`
  return pattern
}
export default standardizeUniversal
