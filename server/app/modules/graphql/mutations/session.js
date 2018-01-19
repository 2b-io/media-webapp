import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import {
  create as createSession,
  verify as verifySession
} from 'services/session'

import Session from '../types/Session'

export default {
  createSession: {
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    type: Session,
    resolve: async (rootValue, args, ctx) => {
      const session = await createSession(args)

      ctx._session = session

      return session
    }
  },
  refreshSession: {
    args: {
      token: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    type: Session,
    resolve: async (rootValue, { token }, ctx) => {
      const session = await verifySession(token, { refresh: true })

      ctx._session = session

      return session
    }
  }
}
