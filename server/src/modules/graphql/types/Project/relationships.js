import {
  GraphQLList,
  GraphQLString
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
  list as listPermissions
} from 'services/permission'

import { Account } from '../Account'
import { Collaborator } from '../Collaborator'
import { Preset } from '../Preset'
import { Media } from '../Media'

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
      let presets = await listPresetsInProject(project)

      return presets.map(preset => {
        // add ref
        preset.project = project

        return preset
      })
    }
  },
  preset: {
    args: {
      hash: {
        type: GraphQLString
      }
    },
    type: Preset,
    resolve: async (project, { hash }) => {

      const preset = await getPreset(project, hash)
      // add ref
      preset.project = project

      return preset
    }
  },
  listMedia: {
    type: new GraphQLList(Media),
    resolve: async (project) => {
      const { slug } = project
      const listMedia = await getListMedia(slug)

      return listMedia
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
      const { slug } = project
      const media = await getMedia(slug, id)

      return media
    }
  }
})
