import * as Dashboard from 'views/pages/dashboard'
import * as Profile from 'views/pages/profile'
import * as ProjectList from 'views/pages/project-list'

import { actions } from 'state/interface'

export default {
  '/': {
    component: Dashboard,
  },
  '/@:username': {
    component: Profile,
  },
  '/projects': {
    component: ProjectList,
    onEnter: () => {
      return [
        actions.fetchProjects()
      ]
    }
  }
}
