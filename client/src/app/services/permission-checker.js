import pathToRegexp from 'path-to-regexp'
import { authRoutes, unauthRoutes } from 'views/route-config'

const authRegexes = Object.keys(authRoutes).map(
  p => pathToRegexp(p)
)

const unauthRegexes = Object.keys(unauthRoutes).map(
  p => pathToRegexp(p)
)

export default isSignedIn => {
  const allows = isSignedIn ? authRegexes : unauthRegexes

  return pathname => {
    return allows.some(regex => regex.test(pathname))
  }
}
