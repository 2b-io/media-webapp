import {
  GraphQLString
} from 'graphql'

export default {
  pullURL: {
    type: GraphQLString
  },
  allowedOrigins: {
    type: new GraphQLList(GraphQLString)
  }
}
