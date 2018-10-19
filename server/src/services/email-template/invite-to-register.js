import config from 'infrastructure/config'

const InviteToRegister = ({ email, code, messenge }) => ({
  html:`<body>
    <h1>Hello ${ email }</h1>
    <p style="color:red">
      We invite you to register and join Media Network.
    </p>
    <p>
      ${ messenge }
    </p>
    <p>Media Network welcome ! Click the link below to setup password</p>
    <a href="${ config.baseUrl }/reset-password/${ code }">Click here setup new password</a>
  </body>`,
  subject: 'Invite To Join Media Network'
})

export default InviteToRegister
