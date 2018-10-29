import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLFloat
} from 'graphql'

export default {
  name: {
    type: GraphQLString
  },
  description: {
    type: GraphQLString
  },
  status: {
    type: GraphQLString
  },
  createdAt: {
    type: GraphQLFloat
  },
  isActive: {
    type: GraphQLBoolean
  }
}
