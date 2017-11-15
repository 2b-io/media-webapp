export default (prefix, map) => {
  let prefixedMap = {}

  Object.keys(map).forEach(key => prefixedMap[key] = `${prefix}.${map[key]}`)

  return prefixedMap
}
