import { GraphQLNonNull } from 'graphql'

import {
  update as updateCacheSetting
} from 'services/cache-setting'

export default ({ CacheSetting, CacheSettingStruct }) => ({
  _update: {
    args: {
      cacheSetting: {
        type: GraphQLNonNull(CacheSettingStruct)
      }
    },
    type: CacheSetting,
    resolve: async (self, { cacheSetting }) => {
      const p = await updateCacheSetting(self.project, cacheSetting)
      p.project = self.project

      return p
    }
  }
})
