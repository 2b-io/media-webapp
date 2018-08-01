import config from 'infrastructure/config'

const sender =  config.aws.ses.sender
const baseUrl =  config.baseUrl

const Register = ({ email }) => {

  const params = {
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data:
            `<html>
              <body>
                <h1>Hello ${ email }</h1>
                <p style='color:red'>
                  Thanks for Register
                </p>
                <p>Media Network wellcome ! Click the link below to login</p>
                <a href="${ baseUrl }/sign-in">Click here login app</a>
              </body>
            </html>`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Register Media Network'
      }
    },
    Source: `${ sender }`
  }
  return params
}

export default Register
