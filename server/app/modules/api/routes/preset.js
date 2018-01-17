import param from 'middlewares/param'

import {
  get as getPreset,
  list as listAllPresets
} from '../controllers/preset'

export default app => {
  app.route('/projects/:slug/presets')
    .get(listAllPresets)

  app.route('/projects/:slug/presets/:hash')
    .get(getPreset)
}
