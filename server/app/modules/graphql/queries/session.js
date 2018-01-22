import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import {
  create as createAccount
} from 'services/account'
import {
  create as createSession,
  verify as verifySession
} from 'services/session'

import Account from '../types/Account'
import Session from '../types/Session'

export default {
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
    resolve: async (rootValue, args, ctx, ...rest) => {
      const { token, refresh = false } = args

      const session = await verifySession(token, { refresh })

      ctx._session = session

      return session
    }
  },
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
  createAccount: {
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    type: Account,
    resolve: async (rootValue, args, ctx) => {
      const account = await createAccount(args)

      return account
    }
  }
}
