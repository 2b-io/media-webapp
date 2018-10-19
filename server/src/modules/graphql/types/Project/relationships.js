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

import cacheSetingService from 'services/cache-setting'
import infrastructureService from 'services/infrastructure'

import { Account } from '../Account'
import { CacheSetting } from '../cache-setting'
import { Collaborator } from '../Collaborator'
import { Preset } from '../Preset'
import { PushSetting } from '../push-setting'
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
      const infrastructure = await infrastructureService.get(project._id)

      // add ref
      infrastructure.project = project

      return infrastructure
    }
  },
  cacheSetting: {
    type: CacheSetting,
    resolve: async (project) => {
      return await cacheSetingService.get(project._id)
    }
  },
  pullSetting: {
    type: PullSetting,
    resolve: async (project) => {
      return await getPullSetting(project._id)
    }
  },
  pushSetting: {
    type: PushSetting,
    resolve: async (project) => ({ project })
  }
})
