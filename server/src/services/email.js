import htmlMinifier from 'html-minifier'
import util from 'util'

import config from 'infrastructure/config'
import sendGrid from 'infrastructure/mailer/send-grid'

import { register, inviteToRegister, resetPassword } from 'services/email-template'

const sendEmail = async (email, { subject, content }) => {
  const sender = config.sendGrid.sender
  const toAddresses = typeof email === 'string' ? [ email ] : email
  const params = {
    to: toAddresses,
    from: sender,
    subject,
    html: htmlMinifier.minify(content, {
      collapseWhitespace: true
    })
  }

  if (config.development) {
    console.log(util.inspect(params, { depth: null }))

    return
  }

  return await sendGrid.send(params)
}

const sendEmailRegister = async (email, { code }) => {
  const emailContent = register({
    activateLink: `${ config.baseUrl }/reset-password/${ code }`,
    email
  })

  await sendEmail(email, emailContent)

  return true
}

const sendEmailInviteToRegister = async (email, {
  code,
  inviter,
  message
}) => {
  const emailContent = inviteToRegister({
    activateLink: `${ config.baseUrl }/reset-password/${ code }`,
    email,
    inviterEmail: inviter.email,
    inviterName: inviter.name,
    message
  })

  await sendEmail(email, emailContent)

  return true
}

const sendEmailResetPassword = async (email, { code }) => {
  const emailContent = resetPassword({
    email,
    resetLink: `${ config.baseUrl }/reset-password/${ code }`
  })

  await sendEmail(email, emailContent)

  return true
}

export default {
  sendEmailInviteToRegister,
  sendEmailRegister,
  sendEmailResetPassword
}
