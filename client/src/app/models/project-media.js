import request from 'services/graphql'

const MEDIA_FRAGMENT = `
  id,
  project,
  contentType,
  path,
  originUrl
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
  }
}
