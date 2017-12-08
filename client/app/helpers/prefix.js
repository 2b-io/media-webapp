import isPlainObject from 'is-plain-object'
import prefix from 'prefix'

export default function addPrefix(style) {
  const prefixedStyle = {}

  Object.keys(style).forEach(key => {
    const child = style[key]

    if (isPlainObject(child)) {
      prefixedStyle[prefix(key)] = addPrefix(child)
    } else {
      prefixedStyle[prefix(key)] = child
    }
  })

  return prefixedStyle
}
