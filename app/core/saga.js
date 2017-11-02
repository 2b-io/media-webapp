import { fork, take, put } from 'redux-saga/effects'

function *changeHistoryFlow() {
  while (true) {
    let action = yield take('HISTORY_CHANGING')

    yield put({
      type: 'HISTORY_CHANGED',
      pathname: action.pathname
    })
  }
}

function *root() {
  yield fork(changeHistoryFlow)
}

export default root
