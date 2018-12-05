import { GraphQLBoolean } from 'graphql'

export default () => ({
  _destroy: {
    type: GraphQLBoolean,
    resolve: async () => true
  }
})
