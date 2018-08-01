import ses from 'infrastructure/mailer/ses'
import { register, resetPassword } from 'services/email-template'

const sendEmail = async (emailContent, email) => {

  const destination = { ToAddresses: [ `${ email }` ] }

  const params = { ...emailContent, Destination: destination }

  return await ses.sendEmail(params).promise()

}

export const sendEmailRegister = async (email) => {

  const emailContent = register(email)

  const result = await sendEmail(emailContent, email)

  return result.MessageId ? true : false
}

export const sendEmailResetPassword = async (email, code) => {

  const emailContent = resetPassword({ email, code })

  const result = await sendEmail(emailContent, email)

  return result.MessageId ? true : false
}
