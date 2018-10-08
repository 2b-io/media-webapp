import pick from 'object.pick'

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

const PROJECTS_FRAGMENT = `
  account {
    projects {
      ${ PROJECT_FRAGMENT }
    }
  }
`

export default {
  async get(identifier, token) {
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
    `, { identifier, token })

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
  async create(token, name, provider) {
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
      project: { name },
      provider,
      token,
    })

    return body.session.account._createProject
  },
  async remove(identifier, token) {
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
  async update(project, token) {
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
      project: pick(project, [ 'name', 'isActive' ]),
      token,
      identifier: project.identifier
    })

    return body.session.account.project._update
  },
  async inviteCollaborator(token, identifier, emailString, messenge) {
    const emails = stringToList(emailString)
    const body = await request(`
      query addCollaboratorsByEmails($token: String!, $identifier: String!, $emails: [String]!, $messenge: String) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              _addCollaboratorsByEmails(emails: $emails, messenge: $messenge){
                ${ COLLABORATOR_FRAGMENT }
              }
            }
          }
        }
      }
    `, {
      token,
      identifier,
      emails,
      messenge
    })

    return body.session.account.project._addCollaboratorsByEmails
  },
  async deleteCollaborator(token, identifier, accountId) {
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
      token,
      identifier,
      accountId
    })

    return body.session.account.project._removeCollaborator
  },
  async makeOwner(token, identifier, accountId) {
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
      token,
      identifier,
      accountId
    })

    return body.session.account.project._makeOwner
  },
  async invalidateCache(token, identifier, patternsInput) {
    const patterns = stringToList(patternsInput)
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
      token,
      identifier,
      patterns
    })

    return body.session.account.project._invalidateCache
  },
  async invalidateAllCache(token, identifier) {
    const body = await request(`
      query invalidateAllCache($token: String!, $identifier: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              _invalidateAllCache
            }
          }
        }
      }
    `, {
      token,
      identifier
    })

    return body.session.account.project._invalidateAllCache
  }
}
