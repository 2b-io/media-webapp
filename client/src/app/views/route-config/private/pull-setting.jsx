import { actions } from 'state/interface'
import * as PullSetting from 'views/pages/pull-setting'

export default {
  '/projects/:identifier/pull-setting': {
    component: PullSetting,
    exact: true,
    onEnter: ({ identifier }) => [
      actions.getProject(identifier),
      actions.getPullSetting(identifier)
    ]
  }
}
