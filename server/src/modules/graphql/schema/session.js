import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import {
  create as createSession,
  verify as verifySession
} from 'services/session'

import { AccountStruct } from '../types/account'
import { Session } from '../types/session'

export default () => ({
  session: {
    args: {
      token: {
        type: new GraphQLNonNull(GraphQLString)
      },
      refresh: {
        type: GraphQLBoolean
      }
    },
    type: Session,
    resolve: async (rootValue, args, ctx) => {
      const { token, refresh = false } = args

      const session = await verifySession(token, { refresh })

      ctx._session = session

      return session
    }
  },
  _createSession: {
    args: {
      account: {
        type: new GraphQLNonNull(AccountStruct)
      }
    },
    type: Session,
    resolve: async (rootValue, { account }, ctx) => {
      const session = await createSession(account)

      ctx._session = session

      return session
    }
  }
})
