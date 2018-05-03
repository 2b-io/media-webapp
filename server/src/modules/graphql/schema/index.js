import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

import account from './account'
import session from './session'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
      ...account(),
      ...session()
    })
  })
})
