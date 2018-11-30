import { GraphQLNonNull } from 'graphql'

import createCacheSettingService from 'services/cache-setting'

export default ({ CacheSetting, CacheSettingStruct }) => ({
  _update: {
    args: {
      cacheSetting: {
        type: GraphQLNonNull(CacheSettingStruct)
      }
    },
    type: CacheSetting,
    resolve: async (self, { cacheSetting }, ctx) => {
      const { project } = self
      const { ttl } = cacheSetting
      const CacheSettingService = createCacheSettingService(ctx._session.account.identifier)
      const updatedCacheSetting = await CacheSettingService.update(project.identifier, { ttl })

      return {
        ...updatedCacheSetting,
        project
      }
    }
  }
})
