import { actions } from 'state/interface'
import * as ChangePassword from 'views/pages/change-password'
import * as EditProfile from 'views/pages/edit-profile'
import * as Profile from 'views/pages/profile'

export default {
  '/@:id/edit': {
    component: EditProfile,
    exact: true,
    onEnter: ({ id }) => [
      actions.getAccount(id)
    ]
  },
  '/@:id/change-password': {
    component: ChangePassword,
    exact: true,
    onEnter: ({ id }) => [
      actions.getAccount(id)
    ]
  },
  '/@:id': {
    topLevel: true,
    component: Profile,
    exact: true,
    onEnter: ({ id }) => [
      actions.getAccount(id)
    ]
  }
}
