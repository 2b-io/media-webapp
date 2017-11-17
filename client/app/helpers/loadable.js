import Loadable from 'react-loadable'

export function loadableContainer(module) {
  return Loadable({
    loader: () => import(`containers/${module}`),
    loading: () => null
  })
}

export function loadableComponent(module) {
  return Loadable({
    loader: () => import(`components/${module}`),
    loading: () => null
  })
}
