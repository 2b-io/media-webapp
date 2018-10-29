import sendGrid from '@sendgrid/mail'
import config from 'infrastructure/config'

sendGrid.setApiKey(config.sendGrid.key)

export default sendGrid
