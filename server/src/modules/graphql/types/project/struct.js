import {
  GraphQLBoolean,
  GraphQLString
} from 'graphql'

import {
  GraphQLDateTime
} from 'graphql-iso-date'

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
    type: GraphQLDateTime
  },
  isActive: {
    type: GraphQLBoolean
  }
}
