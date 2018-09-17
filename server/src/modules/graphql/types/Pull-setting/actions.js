import { GraphQLNonNull } from 'graphql'

import {
  update as updatePullSetting
} from 'services/pull-setting'

export default ({ PullSetting, PullSettingStruct }) => ({
  _update: {
    args: {
      pullSetting: {
        type: GraphQLNonNull(PullSettingStruct)
      }
    },
    type: PullSetting,
    resolve: async (self, { pullSetting }) => {
      const p = await updatePullSetting(self.project, pullSetting)
      // add ref
      p.project = self.project
      
      return p
    }
  }
})
