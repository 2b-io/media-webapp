import {
  GraphQLString,
  GraphQLBoolean
} from 'graphql'
import GraphQLJSON from 'graphql-type-json'

export default {
  contentType: {
    type: GraphQLString
  },
  parameters: {
    type: GraphQLJSON
  },
  isActive: {
    type: GraphQLBoolean
  }
}
