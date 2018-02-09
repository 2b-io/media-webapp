import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'

import actions from './actions'
import struct from './struct'
import relationships from './relationships'

export const AccountStruct = new GraphQLInputObjectType({
  name: 'AccountStruct',
  fields: () => ({
    ...struct
  })
})

export const Account = new GraphQLObjectType({
  name: 'Account',
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    ...struct,
    ...actions(Account, AccountStruct),
    ...relationships(Account, AccountStruct)
  })
})
