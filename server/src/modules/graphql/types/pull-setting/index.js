import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLList
} from 'graphql'

import actions from './actions'
import { header, headerStruct } from '../header'
import struct from './struct'

export const PullSettingStruct = new GraphQLInputObjectType({
  name: 'PullSettingStruct',
  fields: () => ({
    ...struct,
    headers: {
      type: new GraphQLList(headerStruct)
    }
  })
})
export const PullSetting = new GraphQLObjectType({
  name: 'PullSetting',
  fields: () => ({
    ...struct,
    ...actions({ PullSetting, PullSettingStruct }),
    headers: {
      type: new GraphQLList(header)
    }
  })
})
