import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import {
  verify as verifySession
} from 'services/session'

import Session from '../types/Session'

export default {
  session: {
    args: {
      token: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    type: Session,
    resolve: async (rootValue, { token }, ctx, ...rest) => {
      const session = await verifySession(token)

      ctx._session = session

      return session
    }
  }
}
