import {
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'
import header from './header'

export const headerStructInput = new GraphQLInputObjectType({
  name: 'HeaderStructInput',
  fields: () => ({
    ...header
  })
})
export const headerStruct = new GraphQLObjectType({
  name: 'HeaderStruct',
  fields: () => ({
    ...header
  })
})
