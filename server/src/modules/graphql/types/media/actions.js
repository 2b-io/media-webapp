import { GraphQLBoolean } from 'graphql'

import { removeMedia } from 'services/media'

export default () => ({
  _destroy: {
    type: GraphQLBoolean,
    resolve: async (self) => {
      return await removeMedia (self.project, self.id)
    }
  }
})
