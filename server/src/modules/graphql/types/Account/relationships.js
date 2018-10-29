import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat
} from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'
import cloudWatch from 'services/cloud-watch'
import projectService from 'services/project'

import { Project } from '../Project'
import { Session } from '../Session'
import { Metric } from '../Metric'

export default () => ({
  session: {
    type: Session
  },
  projects: {
    type: new GraphQLList(Project),
    resolve: async (account) => {
      const projects = await projectService.list(account._id)

      // add ref
      return projects.map(project => {
        project.account = account

        return project
      })
    }
  },
  project: {
    args: {
      identifier: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    type: Project,
    resolve: async (account, { identifier }) => {
      const project = await projectService.get({
        identifier
      }, account._id)

      // add ref
      project.account = account
      return project
    }
  },
  metricDownload: {
    args: {
      identifier: {
        type: new GraphQLNonNull(GraphQLString)
      },
      startTime: {
        type: new GraphQLNonNull(GraphQLDateTime)
      },
      endTime: {
        type: new GraphQLNonNull(GraphQLDateTime)
      },
      period: {
        type: new GraphQLNonNull(GraphQLFloat)
      }
    },
    type: Metric,
    resolve: async (account, { identifier, startTime, endTime, period }) => {
      return metric = await cloudWatch.metricDownload({
        projectIdentifier: identifier,
        startTime,
        endTime,
        period
      })
    }
  },
  metricUpload: {
    args: {
      identifier: {
        type: new GraphQLNonNull(GraphQLString)
      },
      startTime: {
        type: new GraphQLNonNull(GraphQLDateTime)
      },
      endTime: {
        type: new GraphQLNonNull(GraphQLDateTime)
      },
      period: {
        type: new GraphQLNonNull(GraphQLFloat)
      }
    },
    type: Metric,
    resolve: async (account, { identifier, startTime, endTime, period }) => {
      return metric = await cloudWatch.metricUpload({
        projectIdentifier: identifier,
        startTime,
        endTime,
        period
      })
    }
  }
})
