import {
  GraphQLObjectType,
} from 'graphql'

import actions from './actions'
import relationships from './relationships'

export const PushSetting = new GraphQLObjectType({
  name: 'PushSetting',
  fields: () => ({
    ...actions({ PushSetting }),
    ...relationships({ PushSetting })
  })
})
