import * as UI from 'views/pages/ui'

import { actions } from 'state/interface'

import cacheInvalidate from './private/cache-invalidate'
import dashboard from './private/dashboard'
import inviteCollaborator from './private/invite-collaborator'
import preset from './private/preset'
import profile from './private/profile'
import projectCreate from './private/project-create'
import projectDetail from './private/project-detail'
import projectEdit from './private/project-edit'
import projectList from './private/project-list'
import projectMedia from './private/project-media'
import pullSetting from './private/pull-setting'

export default {
  ...dashboard,
  ...profile,
  ...projectCreate,
  ...projectList,
  ...pullSetting,
  ...projectMedia,
  ...cacheInvalidate,
  ...inviteCollaborator,
  ...projectEdit,
  ...preset,
  ...projectDetail,
  '/ui': {
    component: UI,
    exact: true
  }
}
