import request from 'services/graphql'
import pick from 'object.pick'

import { ACCOUNT_FRAGMENT } from './account'
import { PRESET_FRAGMENT } from './preset'
import { PULL_SETTING_FRAGMENT } from './pull-setting'


export const PERMISSION_FRAGMENT = `
  _id,
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
  pullSetting {
    ${ PULL_SETTING_FRAGMENT }
  }
  presets {
    ${ PRESET_FRAGMENT }
  },
  collaborators {
    _id,
    account {
      ${ ACCOUNT_FRAGMENT }
    },
    privilege
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
  async create(token, name, description, provider) {
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
      project: { name, description },
      provider,
      token,
    })

    return body.session.account._createProject
  },
  async delete(identifier, token) {
    const body = await request(`
      query deleteProject($identifier: String!, $token: String!) {
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
      project: pick(
        {
          ...project
        },
        [ 'name', 'status', 'description' ]
      ),
      token,
      identifier: project.identifier
    })

    return body.session.account.project._update
  },

  async createPreset({ preset, identifier }, token) {
    const body = await request(`
      query createPreset($preset: PresetStruct!, $identifier: String!, $token: String!) {
        session(token: $token) {
          account {
            project (identifier: $identifier) {
              _createPreset(preset: $preset) {
                ${ PRESET_FRAGMENT }
              }
            }
          }
        }
      }
    `, {
      preset: pick(preset, [ 'name', 'values' ]),
      identifier,
      token
    })

    return body.session.account.project._createPreset
  },

  async getPreset({ hash, identifier }, token) {
    const body = await request(`
      query getPreset($hash: String!, $identifier: String!, $token: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              preset(hash: $hash) {
                ${ PRESET_FRAGMENT }
              }
            }
          }
        }
      }
    `, {
      hash,
      identifier,
      token
    })

    return body.session.account.project.preset
  },

  async updatePreset({ preset, identifier }, token) {
    const body = await request(`
      query updatePreset($hash: String!, $preset: PresetStruct!, $identifier: String!, $token: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              preset(hash: $hash){
                _update(preset: $preset) {
                  ${ PRESET_FRAGMENT }
                }
              }
            }
          }
        }
      }
    `, {
      hash: preset.hash,
      preset: pick(preset, [ 'name', 'hash', 'values' ]),
      identifier,
      token
    })

    return body.session.account.project.preset._update
  },

  async deletePreset({ preset, identifier }, token) {
    const body = await request(`
      query deletePreset($hash: String!, $identifier: String!, $token: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              preset(hash: $hash){
                _destroy
              }
            }
          }
        }
      }
    `, {
      hash: preset.hash,
      identifier,
      token
    })

    return body.session.account.project.preset._destroy
  },

  async inviteCollaborator(token, identifier, inputEmailMessenge) {
    const body = await request(`
      query inviteCollaborator($token: String!, $identifier: String!, $email: String!, $messenge: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              _inviteCollaborator(email: $email, messenge:  $messenge){
                ${ PERMISSION_FRAGMENT }
              }
            }
          }
        }
      }
    `, {
      token,
      identifier,
      email: inputEmailMessenge.email,
      messenge: inputEmailMessenge.messenge
    })

    return body.session.account.project._inviteCollaborator
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
  async invalidateCache(token, identifier, patterns) {
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
