import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'

import {
  getListMedia,
  getMedia
} from 'services/media'

import {
  get as getPreset,
  list as listPresetsInProject
} from 'services/preset'

import {
  get as getPullSetting,
} from 'services/pull-setting'

import {
  list as listPermissions
} from 'services/permission'

import {
  getInfrastructure
} from 'services/infrastructure'

import { Account } from '../Account'
import { Collaborator } from '../Collaborator'
import { Preset } from '../Preset'
import { PullSetting } from '../pull-setting'
import { Media } from '../Media'
import { Infrastructure } from '../Infrastructure'

export default () => ({
  account: {
    type: Account
  },
  collaborators: {
    type: new GraphQLList(Collaborator),
    resolve: async (project) => {
      const collaborators = await listPermissions(project)

      return collaborators
    }
  },
  presets: {
    type: new GraphQLList(Preset),
    resolve: async (project) => {
      let presets = await listPresetsInProject(project._id)

      return presets.map(preset => {
        // add ref
        preset.project = project

        return preset
      })
    }
  },
  preset: {
    args: {
      contentType: {
        type: new GraphQLNonNull (GraphQLString)
      }
    },
    type: Preset,
    resolve: async (project, { contentType }) => {

      const preset = await getPreset(project._id, contentType)
      // add ref
      preset.project = project
      return preset
    }
  },
  listMedia: {
    type: new GraphQLList(Media),
    resolve: async (project) => {
      const { identifier } = project
      return await getListMedia(identifier)

    }
  },
  media: {
    args: {
      id: {
        type: GraphQLString
      }
    },
    type: Media,
    resolve: async (project, { id }) => {
      const { identifier } = project
      return await getMedia(identifier, id)

    }
  },
  infrastructure: {
    type: Infrastructure,
    resolve: async (project) => {
      return await getInfrastructure(project._id)
    }
  },
  pullSetting: {
    type: PullSetting,
    resolve: async (project) => {
      return await getPullSetting(project._id)
    }
  }
})
