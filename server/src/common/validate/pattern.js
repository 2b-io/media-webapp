import domain from './domain'
import { pretty, universal } from '../standardize'

const pattern = (input, slug, prettyOrigin) => {
  if (!domain(input)) {
    return null
  }
  if (prettyOrigin.length) {
    return pretty(input, slug, prettyOrigin)
  }
  return universal(input, slug)
}

export default pattern
