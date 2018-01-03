import { ajax } from 'helpers/ajax'
import prefix from 'helpers/prefix-map'

export const PROJECT = prefix('project', {
  ...ajax('CREATE'),
  ...ajax('UPDATE'),
  ...ajax('DELETE')
})

export function createProject(project) {
  return {
    type: PROJECT.CREATE_REQUEST,
    payload: project
  }
}
