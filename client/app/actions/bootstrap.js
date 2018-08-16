import prefix from 'helpers/prefix-map'

export const BOOTSTRAP = prefix('bootstrap', {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS'
})

export function bootstrap() {
  return {
    type: BOOTSTRAP.REQUEST
  }
}
