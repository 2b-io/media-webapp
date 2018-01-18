import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import { create as createSession } from 'services/session'

import sessionType from './type'

export default {
  createSession: {
    type: sessionType,
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
    },
    resolve: async (root, { email }, ctx) => {
      return createSession({ email })
    }
  }
}
