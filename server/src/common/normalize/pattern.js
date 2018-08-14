import { validateDomain } from '../validate'

const normalizePattern = (input, prettyOrigin) => {

  if (validateDomain(input)) {
    return input
  }
  if (!validateDomain(input) && prettyOrigin) {
    return prettyOrigin + input
  }
}

export default normalizePattern
