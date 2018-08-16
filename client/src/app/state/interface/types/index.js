import { types } from 'state/ducks'

export default Object.entries(types || {}).reduce(
  (combine, [ node, types ]) => ({
    ...combine,
    ...Object.entries(types || {}).reduce(
      (combine, [ name, value ]) => ({
        ...combine,
        [`${node.toUpperCase()}/${name.toUpperCase()}`]: value
      }),
      {}
    )
  }),
  {}
)
