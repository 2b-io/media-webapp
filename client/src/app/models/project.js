import request from 'services/graphql'
import { stringToList } from 'services/string-to-list'

import { ACCOUNT_FRAGMENT } from './account'

export const COLLABORATOR_FRAGMENT = `
  account {
    ${ ACCOUNT_FRAGMENT }
  }
  privilege,
`

export const PROJECT_FRAGMENT = `
  identifier,
  name,
  infrastructure {
    domain,
    provider
  },
  status,
  createdAt,
  isActive,
  collaborators {
    ${ COLLABORATOR_FRAGMENT }
  }
`

export const PROJECTS_FRAGMENT = `
  account {
    projects {
      ${ PROJECT_FRAGMENT }
    }
  }
`

export default {
  async get(params, options) {
    const { identifier } = params
    const { token } = options

    const body = await request(`
      query getProject($identifier: String!, $token: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              ${ PROJECT_FRAGMENT }
            }
          }
        }
      }
    `, {
      identifier,
      token
    })

    return body.session.account.project
  },

  async fetch(params, options) {
    const { token } = options

    const body = await request(`
      query projects($token: String!) {
        session(token: $token) {
          ${ PROJECTS_FRAGMENT }
        }
      }
    `, {
      token
    })

    return body.session.account.projects
  },

  async create(params, options) {
    const { name, provider } = params
    const { token } = options

    const body = await request(`
      query createProject($project: ProjectStruct!, $token: String!, $provider: String!) {
        session(token: $token) {
          account {
            _createProject(project: $project, provider: $provider) {
              ${ PROJECT_FRAGMENT }
            }
          }
        }
      }
    `, {
      project: {
        name
      },
      provider,
      token,
    })

    return body.session.account._createProject
  },

  async remove(params, options) {
    const { identifier } = params
    const { token } = options

    const body = await request(`
      query removeProject($identifier: String!, $token: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              _destroy
            }
          }
        }
      }
    `, {
      identifier,
      token
    })

    return body.session.account.project._destroy
  },

  async update(params, options) {
    const {
      project: {
        identifier,
        name,
        isActive
      }
    } = params
    const { token } = options

    const body = await request(`
      query updateProject($project: ProjectStruct!, $token: String!, $identifier: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              _update(project: $project) {
                ${ PROJECT_FRAGMENT }
              }
            }
          }
        }
      }
    `, {
      identifier,
      project: {
        name,
        isActive
      },
      token
    })

    return body.session.account.project._update
  },

  async inviteCollaborators(params, options) {
    const { identifier, emails, message } = params
    const { token } = options

    const body = await request(`
      query addCollaboratorsByEmails(
        $token: String!,
        $identifier: String!,
        $emails: [String]!,
        $message: String
      ) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              _addCollaboratorsByEmails(emails: $emails, message: $message){
                ${ COLLABORATOR_FRAGMENT }
              }
            }
          }
        }
      }
    `, {
      identifier,
      emails: stringToList(emails),
      message,
      token
    })

    return body.session.account.project._addCollaboratorsByEmails
  },

  async deleteCollaborator(params, options) {
    const { identifier, accountId } = params
    const { token } = options

    const body = await request(`
      query removeCollaborator($token: String!, $identifier: String!, $accountId: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              _removeCollaborator(accountId: $accountId)
            }
          }
        }
      }
    `, {
      identifier,
      accountId,
      token
    })

    return body.session.account.project._removeCollaborator
  },

  async makeOwner(params, options) {
    const { identifier, accountId } = params
    const { token } = options

    const body = await request(`
      query makeOwner($token: String!, $identifier: String!, $accountId: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              _makeOwner(accountId: $accountId)
            }
          }
        }
      }
    `, {
      identifier,
      accountId,
      token
    })

    return body.session.account.project._makeOwner
  },

  async invalidateCache(params, options) {
    const { identifier, patterns } = params
    const { token } = options

    const body = await request(`
      query invalidateCache($token: String!, $identifier: String!, $patterns: [String]!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              _invalidateCache(patterns: $patterns)
            }
          }
        }
      }
    `, {
      identifier,
      patterns: stringToList(patterns),
      token
    })

    return body.session.account.project._invalidateCache
  }
}
