import {
  GraphQLBoolean,
  GraphQLString
} from 'graphql'

import {
  GraphQLDateTime
} from 'graphql-iso-date'

export default {
  domain: {
    type: GraphQLString
  },
  protocol: {
    type: GraphQLString
  },
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
    type: GraphQLDateTime
  },
  isActive: {
    type: GraphQLBoolean
  }
}
