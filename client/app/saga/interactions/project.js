import { fork, put } from 'redux-saga/effects'

import { redirect } from 'actions/routing'
import { PROJECT } from 'actions/project'
import showToast from './_toast'

export default {
  [PROJECT.CREATE_FAILURE]: function* (action) {
    yield fork(showToast, {
      type: 'error',
      value: 'Error occurs when creating a project'
    }, false)
  },
  [PROJECT.CREATE_SUCCESS]: function* (action) {
    yield fork(showToast, {
      type: 'info',
      value: `Create project [${action.payload.name}] successfully`,
      link: `/projects/view/${action.payload.slug}`
    })

    yield put(redirect('/dashboard'))
  },
  [PROJECT.FETCH_FAILURE]: function* (action) {
    yield fork(showToast, {
      type: 'error',
      value: 'The project you requested is not exist. Please click this message to visit your the dashboard.',
      link: `/dashboard`
    }, false)
  },
  [PROJECT.REMOVE_SUCCESS]: function* (action) {
    yield fork(showToast, {
      type: 'error',
      value: 'The project has been removed successfully.'
    })

    yield put(redirect('/dashboard'))
  },
  [PROJECT.UPDATE_FAILURE]: function* (action) {
    yield fork(showToast, {
      type: 'error',
      value: 'Error occurs when updating the project'
    }, false)
  },
  [PROJECT.UPDATE_SUCCESS]: function* (action) {
    yield fork(showToast, {
      type: 'info',
      value: `Update project [${action.payload.name}] successfully`,
      link: `/projects/view/${action.payload.slug}`
    })
  }
}
