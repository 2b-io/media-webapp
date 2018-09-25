import authRoutes from './auth'
import unauthRoutes from './unauth'

export const overlay = []
export const content = []
export const still = []
export { authRoutes as authRoutes }
export { unauthRoutes as unauthRoutes }

Object.entries(unauthRoutes).forEach(
  ([ path, { partial, ...props } ]) => {
    if (partial) {
      return
    }

    overlay.push({ path, ...props })
  }
)

Object.entries(authRoutes).forEach(
  ([ path, { partial, component, ...props } ]) => {
    if (partial) {
      return
    }

    const { Content, Still } = component

    content.push({ path, component: Content, ...props })
    still.push({ path, component: Still, ...props })
  }
)
