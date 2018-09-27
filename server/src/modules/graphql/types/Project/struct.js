import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLFloat
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
  },
  created: {
    type: GraphQLFloat
  },
  isActive: {
    type: GraphQLBoolean
  }
}
