import {
  GraphQLBoolean,
  GraphQLString
} from 'graphql'
import GraphQLJSON from 'graphql-type-json'

export default {
  name: {
    type: GraphQLString
  },
  hash: {
    type: GraphQLString
  },
  isDefault: {
    type: GraphQLBoolean
  },
  values: {
    type: GraphQLJSON
  },
  removed: {
    type: GraphQLBoolean
  }
}
