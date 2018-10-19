import util from 'util'

import config from 'infrastructure/config'
import sendgrid from 'infrastructure/mailer/sendgrid'

import { register, inviteToRegister, resetPassword } from 'services/email-template'

const sendGridEmail = async (emailContent, email) => {
  const sender = config.aws.ses.sender
  const toAddresses = typeof email === 'string' ? [ email ] : email
  const params = {
    to: toAddresses,
    from: sender,
    ...emailContent
  }

  if (!config.production) {
    console.log(util.inspect(params, { depth: null }))

    return
  }

  return sendgrid(params)
}

export const sendEmailRegister = async (email, code) => {
  const emailContent = register({ email, code })

  await sendGridEmail(emailContent, email)

  return true
}

export const sendEmailInviteToRegister = async (email, code, messenge) => {
  const emailContent = inviteToRegister({ email, code, messenge })

  await sendGridEmail(emailContent, email)

  return true
}

export const sendEmailResetPassword = async (email, code) => {
  const emailContent = resetPassword({ email, code })

  await sendGridEmail(emailContent, email)

  return true
}
