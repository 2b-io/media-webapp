import {
  GraphQLString,
  GraphQLList
} from 'graphql'

export default {
  allowedOrigins: {
    type: new GraphQLList(GraphQLString)
  }
}
