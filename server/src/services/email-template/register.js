import config from 'infrastructure/config'

const baseUrl = config.baseUrl

const Register = ({ email, code }) => {

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
                <p>Media Network wellcome ! Click the link below to setup password</p>
                <a href="${ baseUrl }/reset-password/${ code }">Click here setup new password</a>
              </body>
            </html>`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Register Media Network'
      }
    }
  }
  return params
}

export default Register
