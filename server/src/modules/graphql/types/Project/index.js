import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLList
} from 'graphql'

import actions from './actions'
import { headerStructInput, headerStruct } from './Header/headerStruct'
import struct from './struct'
import relationships from './relationships'

export const ProjectStruct = new GraphQLInputObjectType({
  name: 'ProjectStruct',
  fields: () => ({
    ...struct,
    headers: {
      type: new GraphQLList(headerStructInput)
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
      type: new GraphQLList(headerStruct)
    },
    ...relationships({ Project, ProjectStruct }),
    ...actions({ Project, ProjectStruct }),
  })
})
