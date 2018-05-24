import { selectors } from 'state/ducks'

export default {
  ...Object.entries(selectors || {}).reduce(
    (combine, [ node, selectors ]) => ({
      ...combine,
      ...Object.entries(selectors || {}).reduce(
        (combine, [ name, func ]) => ({
          ...combine,
          [name]: state => func(state[node])
        }),
        {}
      )
    }),
    {}
  )
}
