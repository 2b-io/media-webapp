import { stringToList } from 'services/string-to-list'

//tested at: https://www.regextester.com/?fam=106985
const domainRegex = /^((?:[a-z\d](?:[a-z\d-]{0,63}[a-z\d])?|\*)\.)+[a-z\d][a-z\d-]{0,63}[a-z\d]$/i

const checkValidDoMain = (domain) => domain && domainRegex.test(domain)

const validDoMain = (value) => {
  if(!value) {
    return undefined
  }

  const domainList = stringToList(value)

  return domainList.some((domain) => !checkValidDoMain(domain)) ? 'Invalid domain' : undefined
}

export default validDoMain
