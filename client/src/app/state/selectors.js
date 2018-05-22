import * as reducers from './ducks/reducers'
import * as selectors from './ducks/selectors'

export default Object.keys(reducers).reduce(
  (combineSelectors, node) => ({
    ...combineSelectors,
    [node]: selectors[node] ?
      Object.keys(selectors[node]).reduce(
        (o, f) => ({
          ...o,
          [f]: state => selectors[node][f](state[node])
        }),
        {}
      ) : {}
  }),
  {}
)
