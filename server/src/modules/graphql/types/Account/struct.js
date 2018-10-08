import {
  GraphQLBoolean,
  GraphQLString
} from 'graphql'

export default {
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
