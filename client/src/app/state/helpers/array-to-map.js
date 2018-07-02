export default (arr, indexKey = '_id') => arr.reduce(
  (dict, element) => ({
    ...dict,
    [ element[ indexKey ] ]: element
  }),
  {}
)
