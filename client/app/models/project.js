import pick from 'object.pick'
import request from 'graphql-request'

export default {
  create: async ({ project, token }) => {
    const body = await request('/graphql', `
      query createProject($project: ProjectStruct!, $token: String!) {
        session(token: $token) {
          account {
            _createProject(project: $project) {
              _id,
              name,
              slug,
              origins,
              presets {
                _id,
                name,
                hash,
                values
              }
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
    const body = await request('/graphql', `
      query fetchProject($slug: String!, $token: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              _id,
              name,
              slug,
              origins,
              presets {
                _id,
                name,
                hash,
                values
              }
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
    const body = await request('/graphql', `
      query fetchAllProjects($token: String!) {
        session(token: $token) {
          account {
            projects {
              _id,
              name,
              slug,
              origins,
              presets {
                _id,
                name,
                hash,
                values
              }
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
    const body = await request('/graphql', `
      query updateProject($project: ProjectStruct!, $slug: String!, $token: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              _update(project: $project) {
                _id,
                name,
                slug,
                origins,
                presets {
                  _id,
                  name,
                  hash,
                  values
                }
              }
            }
          }
        }
      }
    `, {
      project: pick(project, [ 'name', 'origins' ]),
      token,
      slug: project.slug
    })

    return body.session.account.project._update
  }
}
