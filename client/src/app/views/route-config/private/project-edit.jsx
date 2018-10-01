import { actions } from 'state/interface'
import * as EditProject from 'views/pages/edit-project'

export default {
  '/projects/:identifier/edit': {
    component: EditProject,
    exact: true,
    onEnter: ({ identifier }) => [
      actions.getProject(identifier)
    ]
  }
}
