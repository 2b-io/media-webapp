import { GraphQLBoolean } from 'graphql'

export default (Session, SessionStruct) => ({
  _destroy: {
    type: GraphQLBoolean,
    resolve: async (self, args, ctx) => {
      return true
    }
  }
})
