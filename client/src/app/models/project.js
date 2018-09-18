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
  async delete(slug, token) {
    const body = await request(`
      query deleteProject($slug: String!, $token: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              _destroy
            }
          }
        }
      }
    `, {
      slug,
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

  async createPreset({ preset, slug }, token) {
    const body = await request(`
      query createPreset($preset: PresetStruct!, $slug: String!, $token: String!) {
        session(token: $token) {
          account {
            project (slug: $slug) {
              _createPreset(preset: $preset) {
                ${ PRESET_FRAGMENT }
              }
            }
          }
        }
      }
    `, {
      preset: pick(preset, [ 'name', 'values' ]),
      slug,
      token
    })

    return body.session.account.project._createPreset
  },

  async getPreset({ hash, slug }, token) {
    const body = await request(`
      query getPreset($hash: String!, $slug: String!, $token: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              preset(hash: $hash) {
                ${ PRESET_FRAGMENT }
              }
            }
          }
        }
      }
    `, {
      hash,
      slug,
      token
    })

    return body.session.account.project.preset
  },

  async updatePreset({ preset, slug }, token) {
    const body = await request(`
      query updatePreset($hash: String!, $preset: PresetStruct!, $slug: String!, $token: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
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
      slug,
      token
    })

    return body.session.account.project.preset._update
  },

  async deletePreset({ preset, slug }, token) {
    const body = await request(`
      query deletePreset($hash: String!, $slug: String!, $token: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              preset(hash: $hash){
                _destroy
              }
            }
          }
        }
      }
    `, {
      hash: preset.hash,
      slug,
      token
    })

    return body.session.account.project.preset._destroy
  },

  async inviteCollaborator(token, slug, inputEmailMessenge) {
    const body = await request(`
      query inviteCollaborator($token: String!, $slug: String!, $email: String!, $messenge: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              _inviteCollaborator(email: $email, messenge:  $messenge){
                ${ PERMISSION_FRAGMENT }
              }
            }
          }
        }
      }
    `, {
      token,
      slug,
      email: inputEmailMessenge.email,
      messenge: inputEmailMessenge.messenge
    })

    return body.session.account.project._inviteCollaborator
  },

  async deleteCollaborator(token, slug, accountId) {
    const body = await request(`
      query removeCollaborator($token: String!, $slug: String!, $accountId: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              _removeCollaborator(accountId: $accountId)
            }
          }
        }
      }
    `, {
      token,
      slug,
      accountId
    })

    return body.session.account.project._removeCollaborator
  },

  async makeOwner(token, slug, accountId) {
    const body = await request(`
      query makeOwner($token: String!, $slug: String!, $accountId: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              _makeOwner(accountId: $accountId)
            }
          }
        }
      }
    `, {
      token,
      slug,
      accountId
    })

    return body.session.account.project._makeOwner
  },
  async invalidateCache(token, slug, patterns) {
    const body = await request(`
      query invalidateCache($token: String!, $slug: String!, $patterns: [String]!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              _invalidateCache(patterns: $patterns)
            }
          }
        }
      }
    `, {
      token,
      slug,
      patterns
    })

    return body.session.account.project._invalidateCache
  },

  async invalidateAllCache(token, slug) {
    const body = await request(`
      query invalidateAllCache($token: String!, $slug: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              _invalidateAllCache
            }
          }
        }
      }
    `, {
      token,
      slug
    })

    return body.session.account.project._invalidateAllCache
  }
}
