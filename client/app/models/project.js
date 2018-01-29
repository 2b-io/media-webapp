import pick from 'object.pick'
import request from 'services/graphql'

const PROJECT_FRAGMENT = `
  _id,
  name,
  slug,
  origins,
  disabled,
  presets {
    _id,
    name,
    hash,
    values
  }
`

export default {
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
      project: pick(project, [ 'name', 'slug', 'origins' ]),
      token
    })

    return body.session.account._createProject
  },
  fetch: async ({ slug, token }) => {
    const body = await request(`
      query fetchProject($slug: String!, $token: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              ${PROJECT_FRAGMENT}
            }
          }
        }
      }
    `, {
      slug,
      token
    })

    return body.session.account.project
  },
  fetchAll: async ({ token }) => {
    const body = await request(`
      query fetchAllProjects($token: String!) {
        session(token: $token) {
          account {
            projects {
              ${PROJECT_FRAGMENT}
            }
          }
        }
      }
    `, {
      token
    })

    return body.session.account.projects
  },
  update: async ({ project, token }) => {
    const body = await request(`
      query updateProject($project: ProjectStruct!, $slug: String!, $token: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              _update(project: $project) {
                ${PROJECT_FRAGMENT}
              }
            }
          }
        }
      }
    `, {
      project: pick(project, [ 'name', 'origins', 'disabled' ]),
      token,
      slug: project.slug
    })

    return body.session.account.project._update
  }
}
