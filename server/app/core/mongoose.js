import mongoose from 'mongoose'
import config from 'core/config'

mongoose.connect(config.mongodb)

export default mongoose
