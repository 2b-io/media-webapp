import { call, take, fork, put, select } from 'redux-saga/effects'
import ResetPasswordCode from 'models/resetPasswordCode'
import { actions, types, selectors } from 'state/interface'

const loop = function* () {
  while (true) {
    const action = yield take(types['RESETPASSWORDCODE/FETCH'])
    try {
      const resetpass =  yield call(ResetPasswordCode.requestRessetPassword, action.payload.email)
    } catch (e) {
      continue
    }
  }
}

export default function* () {
  yield take('@@INITIALIZED')
  yield fork(loop)
}
