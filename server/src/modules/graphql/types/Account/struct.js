import {
  GraphQLBoolean,
  GraphQLString
} from 'graphql'

export default {
  identifier: {
    type: GraphQLString
  },
  email: {
    type: GraphQLString
  },
  name: {
    type: GraphQLString
  },
  password: {
    type: GraphQLString
  },
  isActive: {
    type: GraphQLBoolean
  }
}
