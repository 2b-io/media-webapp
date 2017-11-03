export default function trace(log = () => {}, scope) {
  return function(target, name, descriptor) {
    if (!descriptor) {
      return descriptor
    }

    const func = descriptor.value

    descriptor.value = function wrapper(...args) {
      log(`>> ${scope ? scope : target.constructor.name}:${name} executing...`)
      log(`>>`, args)
      log(`\n`)

      return func.call(this, ...args)
    }

    return descriptor
  }
}
