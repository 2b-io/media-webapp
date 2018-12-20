import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import { AccountStruct } from '../types/account'
import { Session } from '../types/session'

import createSessionService from 'services/session'

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
      const sessionService = createSessionService()
      const session = await sessionService.verify(token, { refresh })

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
      const sessionService = createSessionService()
      const session = await sessionService.create(account)

      ctx._session = session

      return session
    }
  }
})
