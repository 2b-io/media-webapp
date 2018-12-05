import { GraphQLString } from 'graphql'

export default {
  identifier: {
    type: GraphQLString
  },
  provider: {
    type: GraphQLString
  },
  domain: {
    type: GraphQLString,
    resolve: (self) => self.cname || self.domain
  }
}
