import request from 'services/graphql'
import pick from 'object.pick'

const PRESET_FRAGMENT = `
  name,
  hash,
  values
`
const PERMISSION_FRAGMENT = `
  account,
  privilege
`
export const PROJECT_FRAGMENT = `
  _id,
  name,
  slug,
  disabled,
  prettyOrigin,
  preset {
    ${ PRESET_FRAGMENT }
  },
  permission {
    ${ PERMISSION_FRAGMENT }
  }
`

const PROJECTS_FRAGMENT = `
  account {
    projects {
      ${ PROJECT_FRAGMENT }
    }
  }
`

export default {
  async get(slug, token) {
    const body = await request(`
      query getProject($slug: String!, $token: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              ${ PROJECT_FRAGMENT }
            }
          }
        }
      }
    `, { slug, token })

    return body.session.account.project
  },
  async fetch(token) {
    const body = await request(`
      query projects($token: String!) {
        session(token: $token) {
          ${ PROJECTS_FRAGMENT }
        }
      }
    `, { token })

    return body.session.account.projects
  },
  async create(project, token) {
    const body = await request(`
      query createProject($project: ProjectStruct!, $token: String!) {
        session(token: $token) {
          account {
            _createProject(project: $project) {
              ${ PROJECT_FRAGMENT }
            }
          }
        }
      }
    `, {
      project: pick(project, [ 'name', 'slug' ]),
      token
    })

    return body.session.account._createProject
  }
}
