import {
  GraphQLString,
  GraphQLBoolean
} from 'graphql'

export default {
  key: {
    type: GraphQLString
  },
  description: {
    type: GraphQLString
  },
  isActive: {
    type: GraphQLBoolean
  }
}
