import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

export default new GraphQLObjectType({
  name: 'session',
  fields: () => ({
    token: {
      type: GraphQLString
    },
    ttl: {
      type: GraphQLInt
    }
  })
})
