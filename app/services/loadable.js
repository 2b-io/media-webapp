import Loadable from 'react-loadable'

export function loadableContainer(container) {
  return Loadable({
    loader: () => import(`containers/${container}`),
    loading: () => null
  })
}

export function loadableComponent(component) {
  return Loadable({
    loader: () => import(`containers/${component}`),
    loading: () => null
  })
}
