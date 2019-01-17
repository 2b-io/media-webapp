import { GraphQLNonNull } from 'graphql'

import createPullSettingService from 'services/pull-setting'

export default ({ PullSetting, PullSettingStruct }) => ({
  _update: {
    args: {
      pullSetting: {
        type: GraphQLNonNull(PullSettingStruct)
      }
    },
    type: PullSetting,
    resolve: async (self, { pullSetting }, ctx) => {
      const { project } = self
      const {
        allowedOrigins,
        headers
      } = pullSetting

      const PullSettingService = createPullSettingService(ctx._session.account.identifier)
      const newPullSetting = await PullSettingService.update(project.identifier, {
        allowedOrigins,
        headers
      })

      return {
        ...newPullSetting,
        project
      }
    }
  }
})
