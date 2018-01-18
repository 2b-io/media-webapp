import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

import accountSchema from './account'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...accountSchema.query
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      ...accountSchema.mutation
    }
  })
})
