import {
  GraphQLString,
  GraphQLList
} from 'graphql'

export default {
  pullUrl: {
    type: GraphQLString
  },
  allowedOrigins: {
    type: new GraphQLList(GraphQLString)
  }
}
