import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'

import invalidationService from 'services/invalidation'

import {
  getListMedia,
  getMedia
} from 'services/media'

import {
  list as listPermissions
} from 'services/permission'

import cacheSetingService from 'services/cache-setting'
import infrastructureService from 'services/infrastructure'

import { Account } from '../account'
import { CacheSetting } from '../cache-setting'
import { Collaborator } from '../Collaborator'
import { Invalidation } from '../invalidation'
import { Infrastructure } from '../Infrastructure'
import { Metric } from '../metric'
import { Media } from '../Media'
import { Preset } from '../preset'
import { PushSetting } from '../push-setting'
import { PullSetting } from '../pull-setting'

import createPresetService from 'services/preset'
import createPullSettingService from 'services/pull-setting'

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
    resolve: async (project, args, ctx) => {
      const presetService = createPresetService(ctx._session.account.identifier)
      const presets = await presetService.list(project.identifier)

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
    resolve: async (project, { contentType }, ctx) => {
      const presetService = createPresetService(ctx._session.account.identifier)
      const preset = await presetService.get(project.identifier, contentType)

      return {
        ...preset,
        project
      }
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
      const cacheSetting = await cacheSetingService.get(project._id)

      // add ref
      cacheSetting.project = project

      return cacheSetting
    }
  },
  pullSetting: {
    type: PullSetting,
    resolve: async (project, args, ctx) => {
      const PullSettingService = createPullSettingService(ctx._session.account.identifier)

      return await PullSettingService.get(project.identifier)
    }
  },
  pushSetting: {
    type: PushSetting,
    resolve: async (project) => ({ project })
  },
  metric: {
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    type: Metric,
    resolve: async (project, { name }) => {
      return ({ projectId: project._id, name })
    }
  },
  invalidations: {
    type: new GraphQLList(Invalidation),
    resolve: async (project) => {
      return await invalidationService.list(project.identifier)
    }
  }
})
