import { fork, put, take } from 'redux-saga/effects'

import { actions } from 'state/interface'
import * as Preset from 'views/pages/preset'

export default {
  ...projectEdit,
  '/projects/:identifier/presets/image_jpeg': {
    component: Preset,
    exact: true,
    onEnter: ({ identifier }) => [
      actions.getProject(identifier),
      actions.getPreset({ identifier, contentType: 'image/jpeg' })
    ]
    // state: function*(path) {
    //   yield put(
    //     actions.initializeUIState(path, {
    //       notFound: false
    //     })
    //   )
    // }
  }
}
