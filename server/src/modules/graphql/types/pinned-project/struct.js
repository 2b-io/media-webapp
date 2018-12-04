import {
  GraphQLList,
  GraphQLString
} from 'graphql'

export default {
  projectIdentifiers: {
    type: new GraphQLList(GraphQLString)
  }
}
