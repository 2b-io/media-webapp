import ses from 'infrastructure/mailer/ses'
import { Register, ResetPassword } from 'services/teamplate-email'

const sendEmail = (params) => {

  const sendPromise = ses.sendEmail(params).promise()

  return sendPromise
}

export const sendEmailRegister = async (email) => {

  const contentEmail = await Register(email)

  const result = await sendEmail(contentEmail)

  return result.MessageId ? true : false
}

export const sendEmailResetPassword = async (email, code) => {

  const contentEmail = await ResetPassword({ email, code })

  const result = await sendEmail(contentEmail)

  return result.MessageId ? true : false
}
