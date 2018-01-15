import project from './param-resolvers/project'

const resolvers = {
  project
}

export default (...requiredParams) => (req, res, next) => {
  req._params = {}

  requiredParams.reduce((resolving, param) => {
    const def = typeof param === 'string' ? {
      name: param,
      required: true
    } : param

    const resolver = resolvers[def.name]

    if (!resolver) {
      throw Error(`Cannot find resolver for [${def.name}] parameter`)
    }

    return resolving
      .then(() => resolver(req))
      .then(value => {
        if (!value && def.required) {
          throw Error(`Cannot resolve [${def.name}] parameter`)
        }

        req._params[def.name] = value
      })
  }, Promise.resolve())
  .then(() => next())
  .catch(e => next(e))
}

