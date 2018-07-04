import * as Dashboard from 'views/pages/dashboard'
import * as Profile from 'views/pages/profile'
import * as ProjectDetail from 'views/pages/project-detail'
import * as ProjectList from 'views/pages/project-list'

import { actions } from 'state/interface'

export default {
  '/': {
    component: Dashboard
  },
  '/@:id': {
    component: Profile,
    onEnter: ({ id }) => [
      actions.getAccount(id)
    ]
  },
  '/projects': {
    component: ProjectList,
    onEnter: () => [
      actions.fetchProjects()
    ]
  },
  '/projects/:slug': {
    component: ProjectDetail,
    onEnter: ({ slug }) => [
      actions.getProject(slug)
    ]
  }
}
