import * as Dashboard from 'views/pages/dashboard'
import * as Profile from 'views/pages/profile'
import * as ProjectDetail from 'views/pages/project-detail'
import * as ProjectList from 'views/pages/project-list'
import * as UI from 'views/pages/ui'

import { actions } from 'state/interface'

export default {
  '/': {
    component: Dashboard,
    exact: true
  },
  '/@:id': {
    component: Profile,
    exact: true,
    onEnter: ({ id }) => [
      actions.getAccount(id)
    ]
  },
  '/projects': {
    component: ProjectList,
    exact: true,
    onEnter: () => [
      actions.fetchProjects()
    ]
  },
  '/projects/:slug': {
    component: ProjectDetail,
    exact: false,
    onEnter: ({ slug }) => [
      actions.getProject(slug)
    ]
  },
  '/projects/:slug/presets/:hash': {
    partial: true,
    onEnter: ({ hash, slug }) => [
      actions.getPreset({ hash, slug }),
      actions.showModal({ modal: 'Preset' })
    ]
  },
  '/projects/:slug/invite': {
    partial: true,
    onEnter: () => [
      actions.showModal({ modal: 'InviteCollaborator' })
    ]
  },
  '/ui': {
    component: UI,
    exact: true
  }
}
