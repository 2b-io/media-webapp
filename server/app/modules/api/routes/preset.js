import param from 'middlewares/param'

import {
  list as listAllPresets
} from '../controllers/preset'

export default app => {
  app.get('/projects/:slug/presets', listAllPresets)
}
