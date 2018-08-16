import mongoose from 'mongoose'
import config from 'infrastructure/config'

mongoose.connect(config.mongodb)

export default mongoose
