import { actions } from 'state/ducks'

// TODO add warning about duplicate action name
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
