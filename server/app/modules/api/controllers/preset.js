import param from 'middlewares/param'
import {
  list as listPresets
} from 'services/preset'

export const list = [
  param('project'),
  (req, res, next) => {
    const { project } = req._params

    listPresets(project.slug)
      .then(presets => {
        res.json(presets)
      })
      .catch(e => next(e))
  }
]
