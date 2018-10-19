import {
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'

import actions from './actions'
import struct from './struct'

export const CacheSettingStruct = new GraphQLInputObjectType({
  name: 'CacheSettingStruct',
  fields: () => ({
    ...struct
  })
})
export const CacheSetting = new GraphQLObjectType({
  name: 'CacheSetting',
  fields: () => ({
    ...struct,
    ...actions({ CacheSetting, CacheSettingStruct }),
  })
})
