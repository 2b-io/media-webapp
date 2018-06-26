import request from 'services/graphql'
import pick from 'object.pick'

const PROJECTS_FRAGMENT = `
  account {
    projects {
      _id,
      name,
      slug,
      disabled,
     }
  }
`
export const PROJECT_FRAGMENT = `
  _id,
  name,
  slug,
  disabled,
`

export default {
  getProjectList: async (token) => {
    const body = await request(`
      query projects($token: String!) {
        session(token: $token) {
          ${PROJECTS_FRAGMENT}
        }
      }
    `, { token })
    return body.session.account.projects
  },
  create: async ({ project, token }) => {
    const body = await request(`
      query createProject($project: ProjectStruct!, $token: String!) {
        session(token: $token) {
          account {
            _createProject(project: $project) {
              ${PROJECT_FRAGMENT}
            }
          }
        }
      }
    `, {
      project: pick(project, [ 'name', 'slug', 'prettyOrigin', 'origins' ]),
      token
    })
    return body.session.account._createProject
  },
}
