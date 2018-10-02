import stringToList from 'services/string-to-list'
import checkInvalidEmail from './email'


export default (values) => {
  const emailList = stringToList(values)
  const invalidEmail = emailList.map(
    (email) => checkInvalidEmail(email) ?
    `${ email } is not valid email address. ` : undefined
  )

  return invalidEmail
}

// export default async (values) => {
//   const emailList = await stringToList(values)
//   const invalidEmail = await Promise.all(emailList.map(
//       async (email) => await checkInvalidEmail(email) ?
//       'Have invalid email address.' : undefined
//     ))


//   console.log(invalidEmail);
//   return invalidEmail
// }
