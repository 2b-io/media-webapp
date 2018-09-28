import * as ChangePassword from 'views/pages/change-password'
import * as CreateProject from 'views/pages/create-project'
import * as Dashboard from 'views/pages/dashboard'
import * as EditProject from 'views/pages/edit-project'
import * as EditProfile from 'views/pages/edit-profile'
import * as PresetGif from 'views/pages/preset-gif'
import * as PresetJpeg from 'views/pages/preset-jpeg'
import * as PresetPng from 'views/pages/preset-png'
import * as PresetSvg from 'views/pages/preset-svg'
import * as Profile from 'views/pages/profile'
import * as ProjectDetail from 'views/pages/project-detail'
import * as ProjectList from 'views/pages/project-list'
import * as ProjectMedia from 'views/pages/project-detail/project-media'
import * as PullSetting from 'views/pages/pull-setting'
import * as UI from 'views/pages/ui'

import { actions } from 'state/interface'

export default {
  '/': {
    topLevel: true,
    component: Dashboard,
    exact: true,
    onEnter: () => [
      actions.fetchProjects()
    ]
  },
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
  },
  '/projects': {
    topLevel: true,
    component: ProjectList,
    exact: true,
    onEnter: () => [
      actions.fetchProjects()
    ]
  },
  '/projects/create': {
    component: CreateProject,
    exact: true
  },
  '/projects/:identifier/media': {
    component: ProjectMedia,
    exact: true,
    onEnter: ({ identifier }) => [
      actions.fetchProjectMedia(identifier)
    ]
  },
  '/projects/:identifier/edit': {
    component: EditProject,
    exact: true,
    onEnter: ({ identifier }) => [
      actions.getProject(identifier)
    ]
  },
  '/projects/:identifier/pull-setting': {
    component: PullSetting,
    exact: true,
    onEnter: ({ identifier }) => [
      actions.getProject(identifier),
      actions.getPullSetting(identifier)
    ]
  },
  '/projects/:identifier/presets/image_jpeg': {
    component: PresetJpeg,
    exact: true,
    onEnter: ({ identifier }) => [
      actions.getProject(identifier),
      actions.getPreset({ identifier, contentType: 'image/jpeg' })
    ]
  },
  '/projects/:identifier/presets/image_svg': {
    component: PresetSvg,
    exact: true,
    onEnter: ({ identifier }) => [
      actions.getProject(identifier),
      actions.getPreset({ identifier, contentType: 'image/svg' })
    ]
  },
  '/projects/:identifier/presets/image_gif': {
    component: PresetGif,
    exact: true,
    onEnter: ({ identifier }) => [
      actions.getProject(identifier),
      actions.getPreset({ identifier, contentType: 'image/gif' })
    ]
  },
  '/projects/:identifier/presets/image_png': {
    component: PresetPng,
    exact: true,
    onEnter: ({ identifier }) => [
      actions.getProject(identifier),
      actions.getPreset({ identifier, contentType: 'image/png' })
    ]
  },
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
  '/projects/:identifier/cache-invalidator': {
    partial: true,
    onEnter: () => [
      actions.showModal({ modal: 'CacheInvalidatorModal' })
    ],
    onLeave: () => [
      actions.hideModal({ modal: 'CacheInvalidatorModal' })
    ]
  },
  '/projects/:identifier': {
    component: ProjectDetail,
    exact: false,
    onEnter: ({ identifier }) => identifier === 'create' || [
      actions.getProject(identifier),
      actions.fetchPresets({ identifier }),
      actions.getPullSetting(identifier),
      actions.fetchSecretKeys(identifier)
    ]
  },
  '/ui': {
    component: UI,
    exact: true
  }
}
