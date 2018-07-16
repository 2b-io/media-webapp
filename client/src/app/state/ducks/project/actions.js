import * as types from './types'

export const fetchProjects = () => ({
  type: types.FETCH
})

export const fetchProjectsCompleted = projects => ({
  type: types.FETCH_COMPLETED,
  payload: { projects }
})

export const fetchProjectsFailed = reason => ({
  type: types.FETCH_COMPLETED,
  payload: { reason }
})

export const createProject = project => ({
  type: types.CREATE,
  payload: { project }
})

export const createProjectCompleted = project => ({
  type: types.CREATE_COMPLETED,
  payload: { project }
})

export const createProjectFailed = reason => ({
  type: types.CREATE_FAILED,
  payload: { reason }
})

export const getProject = slug => ({
  type: types.GET,
  payload: { slug }
})

export const getProjectCompleted = project => ({
  type: types.GET_COMPLETED,
  payload: { project }
})

export const getProjectFailed = reason => ({
  type: types.GET_FAILED,
  payload: { reason }
})

export const updateProject = project => ({
  type: types.UPDATE,
  payload: { project }
})

export const updateProjectCompleted = project => ({
  type: types.UPDATE_COMPLETED,
  payload: { project }
})

export const updateProjectFailed = reason => ({
  type: types.UPDATE_FAILED,
  payload: { reason }
})

export const createPreset = preset => ({
  type: types.CREATE_PRESET,
  payload: { preset }
})

export const createPresetCompleted = preset => ({
  type: types.CREATE_PRESET_COMPLETED,
  payload: { preset }
})

export const createPresetFailed = reason => ({
  type: types.CREATE_PRESET_FAILED,
  payload: { reason }
})

export const getPreset = preset => ({
  type: types.GET_PRESET,
  payload: { preset }
})

export const getPresetCompleted = preset => ({
  type: types.GET_PRESET_COMPLETED,
  payload: { preset }
})

export const getPresetFailed = reason => ({
  type: types.GET_PRESET_FAILED,
  payload: { reason }
})

export const updatePreset = preset => ({
  type: types.UPDATE_PRESET,
  payload: { preset }
})

export const updatePresetCompleted = preset => ({
  type: types.UPDATE_PRESET_COMPLETED,
  payload: { preset }
})

export const updatePresetFailed = reason => ({
  type: types.UPDATE_PRESET_FAILED,
  payload: { reason }
})

export const deletePreset = preset => ({
  type: types.DELETE_PRESET,
  payload: { preset }
})

export const deletePresetCompleted = preset => ({
  type: types.DELETE_PRESET_COMPLETED,
  payload: { preset }
})

export const deletePresetFailed = reason => ({
  type: types.DELETE_PRESET_FAILED,
  payload: { reason }
})

export const inviteCollaborator = email => ({
  type: types.INVITE_COLLABORATOR,
  payload: email
})

export const inviteCollaboratorCompleted = collaborator => ({
  type: types.INVITE_COLLABORATOR_COMPLETED,
  payload: { collaborator }
})

export const inviteCollaboratorFailed = reason => ({
  type: types.INVITE_COLLABORATOR_FAILED,
  payload: { reason }
})

export const findCollaborator = email => ({
  type: types.FIND_COLLABORATOR,
  payload: email
})

export const findCollaboratorCompleted = collaborator => ({
  type: types.FIND_COLLABORATOR_COMPLETED,
  payload: { collaborator }
})

export const findCollaboratorFailed = reason => ({
  type: types.FIND_COLLABORATOR_FAILED,
  payload: { reason }
})

export const selectEmaiCollaborator = email => ({
  type: types.SELECT_EMAIL_COLLABORATOR,
  payload: { email }
})
