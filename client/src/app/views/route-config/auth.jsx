import cacheInvalidate from './private/cache-invalidate'
import cacheSetting from './private/cache-setting'
import dashboard from './private/dashboard'
import inviteCollaborator from './private/invite-collaborator'
import preset from './private/preset'
import profile from './private/profile'
import projectCreate from './private/project-create'
import projectDetail from './private/project-detail'
import projectEdit from './private/project-edit'
import projectList from './private/project-list'
import pullSetting from './private/pull-setting'
import usageReport from './private/usage-report'

export default {
  ...cacheInvalidate,
  ...cacheSetting,
  ...dashboard,
  ...inviteCollaborator,
  ...profile,
  ...projectCreate,
  ...projectList,
  ...preset,
  ...projectDetail,
  ...projectEdit,
  ...pullSetting,
  ...usageReport
}
