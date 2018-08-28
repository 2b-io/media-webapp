import { GraphQLString, GraphQLInt } from 'graphql'

export default {
  id: {
    type: GraphQLString
  },
  project: {
    type: GraphQLString
  },
  contentType: {
    type: GraphQLString
  },
  contentLength: {
    type: GraphQLInt
  },
  lastModified: {
    type: GraphQLString
  },
  path: {
    type: GraphQLString
  },
  originUrl: {
    type: GraphQLString
  }
}
