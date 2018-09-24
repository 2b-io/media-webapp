import {
  create as createSecretKey
} from 'services/secret-key'
import { SecretKey } from '../secret-key'

export default () => ({
  _createSecretKey: {
    type: SecretKey,
    resolve: async (self) => {
      return await createSecretKey(self.project._id)
    }
  }
})
