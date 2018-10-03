import * as CacheInvalidate from 'views/pages/cache-invalidate'
import * as InviteCollaborator from 'views/pages/invite-collaborator'
import * as ProjectMedia from 'views/pages/project-detail/project-media'
import * as UI from 'views/pages/ui'

import { actions } from 'state/interface'

import dashboard from './private/dashboard'
import preset from './private/preset'
import profile from './private/profile'
import projectCreate from './private/project-create'
import projectDetail from './private/project-detail'
import projectEdit from './private/project-edit'
import projectList from './private/project-list'
import pullSetting from './private/pull-setting'

export default {
  ...dashboard,
  ...profile,
  ...projectCreate,
  ...projectList,
  ...pullSetting,
  '/projects/:identifier/media': {
    component: ProjectMedia,
    exact: true,
    onEnter: ({ identifier }) => [
      actions.fetchProjectMedia(identifier)
    ]
  },
  '/projects/:identifier/cache-invalidator': {
    component: CacheInvalidate,
    exact: true,
    onEnter: ({ identifier }) => [
      actions.getProject(identifier)
    ]
  },
  '/projects/:identifier/invite-collaborator': {
    component: InviteCollaborator,
    exact: true,
    onEnter: ({ identifier }) => [
      actions.getProject(identifier)
    ]
  },
  ...projectEdit,
  ...preset,
  '/projects/:identifier/invite': {
    partial: true,
    onEnter: () => [
      actions.showModal({ modal: 'InviteCollaborator' })
    ],
    onLeave: () => [
      actions.hideModal({ modal: 'InviteCollaborator' })
    ]
  },
  '/projects/:identifier/invite-by-email': {
    partial: true,
    onEnter: ({ identifier }, { email }) => [
      actions.showModal({ modal: 'CollaboratorInviteEmail', params: { identifier, email } })
    ],
    onLeave: () => [
      actions.hideModal({ modal: 'CollaboratorInviteEmail' })
    ]
  },
  ...projectDetail,
  '/ui': {
    component: UI,
    exact: true
  }
}
