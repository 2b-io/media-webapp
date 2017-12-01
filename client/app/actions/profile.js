import prefix from 'helpers/prefix-map'

export const PROFILE = prefix('profile', {
  FETCH: 'FETCH',
  SET: 'SET'
})

export function fetchProfile(id) {
  return {
    type: PROFILE.FETCH
  }
}

export function setProfile(profile) {
  return {
    type: PROFILE.SET
  }
}
