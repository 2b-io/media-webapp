export default (prefix, map, sep = '/') => {
  let prefixedMap = {}

  Object.keys(map).forEach(key => prefixedMap[key] = `${prefix}${sep}${map[key]}`)

  return prefixedMap
}
