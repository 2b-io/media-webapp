import path from 'path'
import recursiveConfig from 'recursive-config'

export default recursiveConfig.load({
  defaults: {
    __rootDir: path.resolve(__dirname, '..')
  }
})
