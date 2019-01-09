import cacheInvalidate from './private/cache-invalidate'
import cacheSetting from './private/cache-setting'
import cdnUsageReport from './private/cdn-usage-report'
import dashboard from './private/dashboard'
import inviteCollaborator from './private/invite-collaborator'
import optimizeUsageReport from './private/optimize-usage-report'
import preset from './private/preset'
import profile from './private/profile'
import projectCreate from './private/project-create'
import projectDetail from './private/project-detail'
import projectEdit from './private/project-edit'
import projectList from './private/project-list'
import pullSetting from './private/pull-setting'
import reports from './private/reports'


export default {
  ...cacheInvalidate,
  ...cacheSetting,
  ...cdnUsageReport,
  ...dashboard,
  ...inviteCollaborator,
  ...optimizeUsageReport,
  ...profile,
  ...projectCreate,
  ...projectList,
  ...preset,
  ...projectDetail,
  ...projectEdit,
  ...pullSetting,
  ...reports
}
