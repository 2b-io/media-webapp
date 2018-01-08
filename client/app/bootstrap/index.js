import React from 'react'

import { BOOTSTRAP } from 'actions/bootstrap'
import createHistory from './history'
import store from './store'

import Mount from './Mount'

export default function(done) {
  store.dispatch({
    type: BOOTSTRAP.BOOTSTRAP_REQUEST
  })

  createHistory(history => {
    done(<Mount store={store} history={history} />)
  })
}
