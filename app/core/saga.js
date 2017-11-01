import { fork, take, put } from 'redux-saga/effects'

import history from 'core/history'

function *changeHistoryFlow() {
  while (true) {
    let action = yield take('CHANGE_HISTORY')

    history.push(action.path);
  }
}

function *root() {
  yield fork(changeHistoryFlow)
}

export default root
