import Bluebird from 'bluebird'
import mongoose from 'mongoose'
import config from 'core/config'

mongoose.Promise = Bluebird
mongoose.connect(config.mongodb, {
  useMongoClient: true,
  promiseLibrary: Bluebird
})

export default mongoose
