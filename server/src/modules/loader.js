import path from 'path'
import config from 'infrastructure/config'

export function loadSystemModules(app, moduleDefs = []) {
  moduleDefs.forEach(({ mountPath, moduleName }) => {
    const systemModule = loadModule(`modules/${moduleName}`)

    app.use(mountPath, systemModule)
  })
}

export function loadModule(relativePathFromAppRoot, __esModule = false) {
  const modulePath = path.join(config.__rootDir, relativePathFromAppRoot)

  return __esModule ?
    require(modulePath) :
    require(modulePath).default
}
