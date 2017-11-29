import Bluebird from 'bluebird'
import mongoose from 'mongoose'
import config from 'infrastructure/config'

mongoose.Promise = Bluebird
mongoose.connect(config.mongodb, {
  useMongoClient: true,
  promiseLibrary: Bluebird
})

export default mongoose
