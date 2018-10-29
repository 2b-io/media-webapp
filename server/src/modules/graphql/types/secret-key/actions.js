import { GraphQLNonNull, GraphQLBoolean } from 'graphql'

import {
  update as updateSecretKey,
  remove as removeSecretKey
} from 'services/secret-key'

export default ({ SecretKey, SecretKeyStruct }) => ({
  _destroy: {
    type: GraphQLBoolean,
    resolve: async (self) => {
      return removeSecretKey(self.project, self.key)
    }
  },
  _update: {
    args: {
      secretKey: {
        type: GraphQLNonNull(SecretKeyStruct)
      }
    },
    type: SecretKey,
    resolve: async (self, { secretKey }) => {
      return updateSecretKey(self.project, self.key, secretKey)
    }
  }
})
