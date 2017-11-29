import path from 'path'

const APP_ROOT = path.resolve(__dirname, '..')

export function loadSystemModules(app, moduleDefs = []) {
  moduleDefs.forEach(({ mountPath, moduleName }) => {
    const systemModule = loadModule(`modules/${moduleName}`)

    app.use(mountPath, systemModule)
  })
}

export function loadModule(relativePathFromAppRoot, __esModule = false) {
  const modulePath = path.join(APP_ROOT, relativePathFromAppRoot)

  return __esModule ?
    require(modulePath) :
    require(modulePath).default
}
