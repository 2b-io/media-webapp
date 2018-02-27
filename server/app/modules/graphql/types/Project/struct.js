import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLString
} from 'graphql'

export default {
  name: {
    type: GraphQLString
  },
  slug: {
    type: GraphQLString
  },
  prettyOrigin: {
    type: GraphQLString
  },
  origins: {
    type: new GraphQLList(GraphQLString)
  },
  disabled: {
    type: GraphQLBoolean
  },
  removed: {
    type: GraphQLBoolean
  }
}

