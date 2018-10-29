import request from 'services/graphql'

const MEDIA_FRAGMENT = `
  id,
  contentLength,
  contentType,
  cdnUrl,
  originUrl,
  path,
  project
`
const LIST_MEDIA_FRAGMENT =`
  ${ MEDIA_FRAGMENT }
`

export default {
  async fetchProjectMedia(token, slug) {

    const body = await request(`
      query fetchProjectMedia($token: String!, $slug: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              listMedia {
                ${ LIST_MEDIA_FRAGMENT }
              }
            }
          }
        }
      }
    `, {
      token,
      slug
    })
    return body.session.account.project.listMedia
  },

  async removeProjectMedia(token, slug, id) {

    const body = await request(`
      query removeMedia($token: String!, $slug: String!, $id: String!) {
        session(token: $token) {
          account {
            project(slug: $slug) {
              media(id: $id) {
                _destroy
              }
            }
          }
        }
      }
    `, {
      token,
      slug,
      id
    })
    return body.session.account.project.media._destroy
  }
}
