export default ({
  activateLink,
  email,
  inviterName, inviterEmail,
  message
}) => ({
  subject: 'Invitation to join Media CDN',
  content: `
    <body>
      <p>
        Hello ${ email },<br /><br />
        You receive this email because ${ inviterName } <${ inviterEmail }> has sent you an invitation to join Media CDN.<br />
        ${ message ?
          `You can see his personal message to you as follows:<br />
          ${ message }<br /><br />` : ''
        }
        Welcome to Media CDN! Please click the link below to activate your account.<br />
        <a href="${ activateLink }">Activate your account</a><br /><br />
        Thanks for your trust in Media CDN!
      </p>
    </body>
  `
})
