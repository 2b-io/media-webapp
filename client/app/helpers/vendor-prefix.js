import isPlainObject from 'is-plain-object'
import prefix from 'prefix'

function isColorObject(obj) {
  return typeof obj.string === 'function'
}

export default function addPrefix(style, path = '') {
  const prefixedStyle = {}

  Object.keys(style).forEach(key => {
    const child = style[key]

    if (isColorObject(child)) {
      prefixedStyle[prefix(key)] = child.string()
    } else if (isPlainObject(child)) {
      prefixedStyle[prefix(key)] = addPrefix(child, `${path}/${key}`)
    } else {
      prefixedStyle[prefix(key)] = child
    }
  })

  return prefixedStyle
}
