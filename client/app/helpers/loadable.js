import Loadable from 'react-loadable'

import reduxRoute from 'decorators/ReduxRoute'

export function loadableContainer(module, path, exact = true) {
  const LoadableComponent = Loadable({
    loader: () => import(`containers/${module}`),
    loading: () => null
  })

  return reduxRoute(path, exact)(LoadableComponent)
}

export function loadableComponent(module) {
  return Loadable({
    loader: () => import(`components/${module}`),
    loading: () => null
  })
}
