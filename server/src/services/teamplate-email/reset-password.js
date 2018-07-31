import config from 'infrastructure/config'

const sender =  config.aws.ses.sender
const baseUrl =  config.baseUrl

const ResetPassword = ({ email, code }) => {
  const params = {
    Destination: {
      ToAddresses: [ `${ email }` ]
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data:
            `<html>
              <body>
                <h1>Hello ${ email }</h1>
                <p style='color:red'>
                  Please click the link below to reset your password
                </p>
                <a href="${ baseUrl }/reset-password/${ code }">Click here reset Password</a>
              </body>
            </html>`
        },
        Text: {
          Charset: 'UTF-8',
          Data: `Hello ${ email }`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Reset password Media Network'
      }
    },
    Source: `${ sender }`
  }
  return params
}

export default ResetPassword
