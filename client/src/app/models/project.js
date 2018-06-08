import pick from 'object.pick'
import request from 'services/graphql'

const PROJECT_FRAGMENT = `
  _id,
  name,
  slug,
  account {
    email
  }
`

export default {
  projectList: async (token) => {
    console.log('token garpppp');
    const body = await request(`
      query projects($token: String!) {
        projectList(token: $token) {
          ${PROJECT_FRAGMENT}
        }
      }
    `, {
      token: token
    })
    return body.projectList
  },
}
