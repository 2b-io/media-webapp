import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLList
} from 'graphql'

import actions from './actions'
import { secretKey, secretKeyStruct } from '../secret-key'

export const PushSettingStruct = new GraphQLInputObjectType({
  name: 'PushSettingStruct',
  fields: () => ({
    secretKeys: {
      type: new GraphQLList(secretKeyStruct)
    }
  })
})
export const PushSetting = new GraphQLObjectType({
  name: 'PushSetting',
  fields: () => ({
    ...actions({ PushSetting, PushSettingStruct }),
    secretKeys: {
      type: new GraphQLList(secretKey)
    }
  })
})
