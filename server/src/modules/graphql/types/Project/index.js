import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'

import actions from './actions'
import struct from './struct'
import relationships from './relationships'

export const ProjectStruct = new GraphQLInputObjectType({
  name: 'ProjectStruct',
  fields: () => ({
    ...struct
  })
})

export const Project = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    ...struct,
    ...relationships({ Project, ProjectStruct }),
    ...actions({ Project, ProjectStruct }),
  })
})
