import env from 'dotenv'
import fs from 'fs-extra'
import path from 'path'

const rootDir = path.resolve(__dirname, '..')
const envPath = path.resolve(rootDir, '../internals/.env')

const envExisted = fs.pathExistsSync(envPath)

if (!envExisted) {
  console.warn(`
    Could not found [ internals/.env ].
    You can create one by copying [ internals/.example.env ]...
  `)

  throw Error('The server should be configured before starting')
}

env.config({
  path: envPath
})

export default {
  __rootDir: rootDir,
  systemPort: process.env.PORT,
  webpackDevServer: process.env.DEV_SERVER,
  mongodb: process.env.MONGO,
  session: {
    secret: process.env.SESSION_SECRET,
    ttl: process.env.SESSION_TTL
  },
  aws: {
    ses: {
      region: process.env.AWS_SES_REGION,
      accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
      apiVersion: process.env.AWS_SES_API_VERSION,
      sender: process.env.AWS_SES_SENDER
    }
  },
  baseUrl: process.env.BASE_URL,
  cdnServer: process.env.CDN_DEV_SERVER,
  cdnApiVersion: process.env.CDN_API_VERSION,
  cdnUrlInvalidCache: process.env.CDN_URL_INVALID_CACHE
}
