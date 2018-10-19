import sgMail from '@sendgrid/mail'
import config from 'infrastructure/config'

sgMail.setApiKey(config.sendGrid)

export default sgMail
