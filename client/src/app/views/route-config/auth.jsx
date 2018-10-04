import * as CacheInvalidate from 'views/pages/cache-invalidate'
import * as ProjectMedia from 'views/pages/project-detail/project-media'
import * as UI from 'views/pages/ui'

import { actions } from 'state/interface'

import dashboard from './private/dashboard'
import InviteCollaborator from './private/invite-collaborator'
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
  ...InviteCollaborator,
  ...projectEdit,
  ...preset,
  ...projectDetail,
  '/ui': {
    component: UI,
    exact: true
  }
}
