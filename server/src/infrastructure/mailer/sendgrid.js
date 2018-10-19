import sgMail from '@sendgrid/mail'
import config from 'infrastructure/config'

sgMail.setApiKey(config.sendGrid)
const sendgrid = (params) => { sgMail.send(params) }
export default sendgrid
