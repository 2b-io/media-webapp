import { actions } from 'state/interface'
import * as Dashboard from 'views/pages/dashboard'

export default {
  '/': {
    topLevel: true,
    component: Dashboard,
    exact: true,
    onEnter: () => [
      actions.fetchProjects()
    ]
  }
}
