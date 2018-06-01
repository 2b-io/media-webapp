import * as Dashboard from 'views/pages/dashboard'
import * as Profile from 'views/pages/profile'
import * as ProjectList from 'views/pages/project-list'

export default {
  '/': Dashboard,
  '/@:username': Profile,
  '/projects': ProjectList
}
