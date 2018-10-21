export default ({
  email,
  resetLink
}) => ({
  subject: 'Password reset in Media CDN',
  content: `
    <body>
      <p>
        Hello ${ email },<br /><br />
        We have just received your request to reset your password.<br />
        Please click the link below to reset your password:<br />
        <a href="${ resetLink }">Reset your password</a><br /><br />
        Thanks for your trust in Media CDN!
      </p>
    </body>
  `
})
