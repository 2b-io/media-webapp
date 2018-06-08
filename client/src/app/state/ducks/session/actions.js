import * as types from './types'

export const createSession = credential => {   console.log("credential",credential); return ({
  type: types.CREATE,
  payload: { credential }
})}

export const destroySession = () => ({
  type: types.DESTROY
})

export const createSessionCompleted = info =>{ console.log("info",info); return ({
  type: types.CREATE_COMPLETED,
  payload: { info }
})}

export const destroySessionCompleted = () => ({
  type: types.DESTROY_COMPLETED
})
