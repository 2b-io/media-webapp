import {
  GraphQLInt,
  GraphQLString
} from 'graphql'

export default {
  token: {
    type: GraphQLString
  },
  ttl: {
    type: GraphQLInt
  }
}
