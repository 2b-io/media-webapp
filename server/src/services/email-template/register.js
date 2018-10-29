export default ({
  activateLink,
  email
}) => ({
  subject: 'Welcome message from Media CDN',
  content: `
    <body>
      <p>
        Hello, ${ email },<br /><br />
        Thank you for registering at Media CDN.<br />
        Please click the link below to activate your account and set up your password:
        <a href="${ activateLink }">Activate your account</a><br /><br />
        Thanks for your trust in Media CDN!
      </p>
    </body>
  `
})
