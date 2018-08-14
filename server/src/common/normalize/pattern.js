import { validateDomain } from '../validate'
import { standardizePretty, standardizeUniversal } from '../standardize'

const normalizePattern = (input, slug, prettyOrigin) => {
  if (!validateDomain(input)) {
    return null
  }
  if (prettyOrigin) {
    return standardizePretty(input, slug, prettyOrigin)
  }
  return standardizeUniversal(input, slug)
}

export default normalizePattern
