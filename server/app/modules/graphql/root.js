import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

import publicActions from './public'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...publicActions
    }
  })
})
