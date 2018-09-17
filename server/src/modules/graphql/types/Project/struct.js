import {
  GraphQLBoolean,
  GraphQLString
} from 'graphql'

export default {
  name: {
    type: GraphQLString
  },
  identifier: {
    type: GraphQLString
  },
  description: {
    type: GraphQLString
  },
  status: {
    type: GraphQLString
  },
  removed: {
    type: GraphQLBoolean
  }
}
