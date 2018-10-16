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
    resolve: (self) => {
      if (!self.cname) {
        return self.domain
      }

      return `${ self.project.identifier }.${ self.cname }`
    }
  }
}
