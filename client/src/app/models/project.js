import request from 'services/graphql'
import pick from 'object.pick'

import { ACCOUNT_FRAGMENT } from './account'

export const PERMISSION_FRAGMENT = `
  _id,
  account {
    ${ ACCOUNT_FRAGMENT }
  }
  privilege,
`
export const PRESET_FRAGMENT = `
  name,
  hash,
  values,
  removed,
  isDefault
`

export const PROJECT_FRAGMENT = `
  _id,
  name,
  slug,
  disabled,
  prettyOrigin,
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
      query updateProject($project: ProjectStruct!, $token: String!, $slug: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              _update(project: $project) {
                ${ PROJECT_FRAGMENT }
              }
            }
          }
        }
      }
    `, {
      project: pick(project, [ 'name', 'origins', 'prettyOrigin', 'disabled' ]),
      token,
      slug: project.slug
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

  async inviteCollaborator(token, slug, email) {
    const body = await request(`
      query inviteCollaborator($token: String!, $slug: String!, $email: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              _inviteCollaborator(email: $email){
                ${ PERMISSION_FRAGMENT }
              }
            }
          }
        }
      }
    `, {
      token,
      slug,
      email
    })
    return body.session.account.project._inviteCollaborator
  },
}
