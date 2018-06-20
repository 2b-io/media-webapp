import Account from 'services/account'

export const requestRessetPassword = async (email) => {
  console.log("email services",email);
  const account = await Account.findByEmail(email)
  console.log(account);
  return account
}


export const remove = async () => {

}
