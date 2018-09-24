import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql'

import {
  get as getSecretKey,
  list as listSecretKeys
} from 'services/secret-key'

import { SecretKey } from '../secret-key'

export default () => ({
  secretKeys: {
    type: new GraphQLList(SecretKey),
    resolve: async (self) => {
      return await listSecretKeys(self.project._id)
    }
  },
  secretKey: {
    args: {
      key: {
        type: new GraphQLNonNull (GraphQLString)
      }
    },
    type: SecretKey,
    resolve: async (self, { key }) => {
      return await getSecretKey(self.project._id, key)
    }
  }
})
