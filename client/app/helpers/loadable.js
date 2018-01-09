import loadable from 'react-loadable'

import reduxRoute from 'decorators/ReduxRoute'

export function loadableContainer(module, path, exact = true) {
  return reduxRoute(path, exact)(loadable({
    loader: () => import(`containers/${module}`),
    loading: () => null
  }))
}

export function loadableComponent(module) {
  return loadable({
    loader: () => import(`components/${module}`),
    loading: () => null
  })
}
