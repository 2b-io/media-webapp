import { GraphQLNonNull, GraphQLBoolean } from 'graphql'

import {
  update as updatePushSetting,
  remove as removePushSetting
} from 'services/push-setting'

export default ({ PushSetting, PushSettingStruct }) => ({
  _update: {
    args: {
      pushSetting: {
        type: GraphQLNonNull(PushSettingStruct)
      }
    },
    type: PushSetting,
    resolve: async (self, { pushSetting }) => {

      const p = await updatePushSetting(self.project, pushSetting)
      // add ref
      p.project = self.project

      return p
    }
  },
  _destroy: {
    type: GraphQLBoolean,
    resolve: async (self) => {

      const p = await removePushSetting(self.project)
      // add ref
      p.project = self.project

      return p
    }
  }
})
