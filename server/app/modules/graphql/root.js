import {
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

import accountMutations from './mutations/account'
import sessionMutations from './mutations/session'
import sessionQueries from './queries/session'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...sessionQueries
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      ...accountMutations,
      ...sessionMutations
    }
  })
})
