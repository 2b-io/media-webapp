import { actions } from 'state/ducks'

export default [
  ...Object.values(actions)
].reduce(
  (combine, actions) => {
    return {
      ...combine,
      ...actions
    }
  },
  {}
)
