export default function trace(log = console.debug) {
  return function(target, name, descriptor) {
    if (!descriptor) {
      return descriptor
    }

    const func = descriptor.value

    descriptor.value = function wrapper(...args) {
      log(`>> ${target.constructor.name}:${name} executing...`)
      log(`>>`, args)

      return func.call(this, ...args)
    }

    return descriptor
  }
}
