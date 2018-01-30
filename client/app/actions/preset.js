import { ajax } from 'helpers/ajax'
import prefix from 'helpers/prefix-map'

export const PRESET = prefix('preset', {
  ...ajax('CREATE'),
  ...ajax('UPDATE'),
  ...ajax('REMOVE')
})

export function updatePreset(project, preset) {
  return {
    type: PRESET.UPDATE_REQUEST,
    payload: {
      project,
      preset
    }
  }
}

export function removePreset(project, hash) {
  return {
    type: PRESET.REMOVE_REQUEST,
    payload: {
      project,
      hash
    }
  }
}
