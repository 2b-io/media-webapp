import { GraphQLList, GraphQLString } from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'

export default {
  identifier: {
    type: GraphQLString
  },
  project: {
    type: GraphQLString
  },
  cdnInvalidationRef: {
    type: GraphQLString
  },
  patterns: {
    type: new GraphQLList(GraphQLString)
  },
  status: {
    type: GraphQLString
  },
  createdAt: {
    type: GraphQLDateTime
  }
}
