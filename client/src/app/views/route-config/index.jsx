import authRoutes from './auth'
import unauthRoutes from './unauth'

export const overlay = []
export const content = []
export const still = []
export { authRoutes as authRoutes }
export { unauthRoutes as unauthRoutes }

Object.entries(unauthRoutes).forEach(
  ([ path, { component, exact, partial } ]) => {
    if (partial) {
      return
    }

    overlay.push({ path, component, exact })
  }
)

Object.entries(authRoutes).forEach(
  ([ path, { component, exact, partial } ]) => {
    if (partial) {
      return
    }

    const { Content, Still } = component

    content.push({ path, component: Content, exact })
    still.push({ path, component: Still, exact })
  }
)
