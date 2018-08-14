
const validateDomain = (input) => {
  const domain = input.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/)
  if (!domain) {
    return false
  }
  const regexCheckDomain = /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/
  return regexCheckDomain.test(domain[1])
}

export default validateDomain
