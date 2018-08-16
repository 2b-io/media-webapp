import aws from 'aws-sdk'
import config from 'infrastructure/config'

export default new aws.SES({
  apiVersion: config.aws.ses.apiVersion,
  accessKeyId: config.aws.ses.accessKeyId,
  secretAccessKey: config.aws.ses.secretAccessKey,
  region: config.aws.ses.region
})
