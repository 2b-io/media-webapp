import 'stylus/global'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import initializeStore from 'state/store'
import App from 'views/app'

const store = initializeStore(window.REDUX_INITIAL_DATA)

const root = document.getElementById('root')

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  root
)
