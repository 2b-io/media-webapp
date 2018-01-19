import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import GraphQLJSON from 'graphql-type-json'

export default new GraphQLObjectType({
  name: 'Preset',
  fields: {
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    hash: {
      type: GraphQLString
    },
    isDefault: {
      type: GraphQLBoolean
    },
    values: {
      type: GraphQLJSON
    }
  }
})
