import * as CacheInvalidate from 'views/pages/cache-invalidate'
import * as InviteCollaborator from 'views/pages/invite-collaborator'
import * as PresetGif from 'views/pages/preset-gif'
import * as PresetJpeg from 'views/pages/preset-jpeg'
import * as PresetPng from 'views/pages/preset-png'
import * as PresetSvg from 'views/pages/preset-svg'

import * as ProjectMedia from 'views/pages/project-detail/project-media'
import * as UI from 'views/pages/ui'

import { actions } from 'state/interface'

import dashboard from './private/dashboard'
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
