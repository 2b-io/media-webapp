import { GraphQLNonNull } from 'graphql'

import cacheSettingService from 'services/cache-setting'

export default ({ CacheSetting, CacheSettingStruct }) => ({
  _update: {
    args: {
      cacheSetting: {
        type: GraphQLNonNull(CacheSettingStruct)
      }
    },
    type: CacheSetting,
    resolve: async (self, { cacheSetting }) => {
      const updatedCacheSetting = await cacheSettingService.update(self.project, cacheSetting)
      
      // add ref
      updatedCacheSetting.project = self.project

      return updatedCacheSetting
    }
  }
})
