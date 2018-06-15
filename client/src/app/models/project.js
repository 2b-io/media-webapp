import request from 'services/graphql'

const PROJECT_FRAGMENT = `
  account {
    projects {
       _id,
       name,
       slug
     }
  }
`

export default {
  getProjectList: async (token) => {
    const body = await request(`
      query projects($token: String!) {
        session(token: $token) {
          ${PROJECT_FRAGMENT}
        }
      }
    `, { token })

    return body.session.account.projects
  }
}
