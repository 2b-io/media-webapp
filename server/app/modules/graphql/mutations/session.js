import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { create as createSession } from 'services/session'

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
  }
}
