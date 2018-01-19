import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import Account from './Account'

export default new GraphQLObjectType({
  name: 'Session',
  fields: {
    token: {
      type: GraphQLString
    },
    ttl: {
      type: GraphQLInt
    },
    account: {
      type: Account,
      resolve: async (rootValue, args, ctx) => {
        return ctx._session.$meta.account
      }
    }
  }
})
