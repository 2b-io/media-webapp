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

import createCacheSettingService from 'services/cache-setting'
import createCollaboratorService from 'services/collaborator'
import createInfrastructureService from 'services/infrastructure'
import createPresetService from 'services/preset'
import createPullSettingService from 'services/pull-setting'

export default () => ({
  account: {
    type: Account
  },
  collaborators: {
    type: new GraphQLList(Collaborator),
    resolve: async (project, args, ctx) => {
      const collaboratorService = createCollaboratorService(ctx._session.account.identifier)

      return await collaboratorService.list(project.identifier)
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
      const infrastructureService = createInfrastructureService()
      const infrastructure = await infrastructureService.get(project.identifier)

      return {
        ...infrastructure,
        project
      }
    }
  },
  cacheSetting: {
    type: CacheSetting,
    resolve: async (project, args, ctx) => {
      const CacheSettingService = createCacheSettingService(ctx._session.account.identifier)
      const cacheSetting = await CacheSettingService.get(project.identifier)

      return {
        ...cacheSetting,
        project
      }
    }
  },
  pullSetting: {
    type: PullSetting,
    resolve: async (project, args, ctx) => {
      const PullSettingService = createPullSettingService(ctx._session.account.identifier)
      const pullSetting = await PullSettingService.get(project.identifier)

      return {
        ...pullSetting,
        project
      }
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
