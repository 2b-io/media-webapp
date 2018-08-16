import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLList
} from 'graphql'

import actions from './actions'
import { headerStruct, header } from '../Header'
import struct from './struct'
import relationships from './relationships'

export const ProjectStruct = new GraphQLInputObjectType({
  name: 'ProjectStruct',
  fields: () => ({
    ...struct,
    headers: {
      type: new GraphQLList(headerStruct)
    }
  })
})

export const Project = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    ...struct,
    headers: {
      type: new GraphQLList(header)
    },
    ...relationships({ Project, ProjectStruct }),
    ...actions({ Project, ProjectStruct }),
  })
})
