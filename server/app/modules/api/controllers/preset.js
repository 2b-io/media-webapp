import param from 'middlewares/param'
import {
  list as listPresets
} from 'services/preset'

export const list = [
  param('session', 'project', 'permission'),
  (req, res, next) => {
    const { project } = req._params

    listPresets(project)
      .then(presets => {
        res.json(presets)
      })
      .catch(e => next(e))
  }
]

export const get = [
  param('session', 'project', 'permission', 'preset'),
  (req, res, next) => {
    const { preset } = req._params

    res.json(preset)
  }
]
