import pick from 'object.pick'
import request from 'services/graphql'

const PROJECT_FRAGMENT = `
  account {
    email
    projects {
       _id
       name
       slug
     }
  }
`

export default {
  projectList: async (token) => {
    const body = await request(`
      query projects($token: String!) {
        session(token: $token) {
          ${PROJECT_FRAGMENT}
        }
      }
    `, {token: token})
    return body.session
  }
}
