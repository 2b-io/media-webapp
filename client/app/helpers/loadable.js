import Loadable from 'react-loadable'

export function loadableContainer(module) {
  return Loadable({
    loader: () => import(`components/containers/${module}`),
    loading: () => null
  })
}

export function loadableComponent(module) {
  return Loadable({
    loader: () => import(`components/dumb/${module}`),
    loading: () => null
  })
}
