import {
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'

import actions from './actions'
import struct from './struct'
import relationships from './relationships'

export const SessionStruct = new GraphQLInputObjectType({
  name: 'SessionStruct',
  fields: {
    ...struct
  }
})

export const Session = new GraphQLObjectType({
  name: 'Session',
  fields: {
    ...struct,
    ...actions(Session, SessionStruct),
    ...relationships(Session, SessionStruct)
  }
})
