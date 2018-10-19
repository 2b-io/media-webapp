import config from 'infrastructure/config'

const ResetPassword = ({ email, code }) => ({
  html: `<body>
    <h1>Hello ${ email }</h1>
    <p style="color:red">
      Please click the link below to reset your password
    </p>
    <a href="${ config.baseUrl }/reset-password/${ code }">Click here reset Password</a>
  </body>`,
  subject: 'Reset password Media Network'
})

export default ResetPassword
