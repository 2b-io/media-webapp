import pathToRegexp from 'path-to-regexp'
import { authRoutes, unauthRoutes } from 'views/route-config'

const authRegexes = Object.entries(authRoutes).map(
  ([ path ]) => pathToRegexp(path, null, { end: true })
)

const unauthRegexes = Object.entries(unauthRoutes).map(
  ([ path ]) => pathToRegexp(path, null, { end: true })
)

export default isSignedIn => {
  const allows = isSignedIn ? authRegexes : unauthRegexes

  return pathname => {
    return allows.some(regex => regex.test(pathname))
  }
}
