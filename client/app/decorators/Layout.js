import React from 'react'
import { connect } from 'react-redux'

import { LAYOUT, changeLayout } from 'actions/layout'

export const ACCOUNT_MODE = LAYOUT.ACCOUNT_MODE
export const FULLSCREEN_MODE = LAYOUT.FULLSCREEN_MODE
export const SYSTEM_MODE = LAYOUT.SYSTEM_MODE

export default function(mode) {
  return function(Component) {
    @connect()
    class Layout extends React.Component {

      componentDidMount() {
        const { dispatch } = this.props

        dispatch(changeLayout(mode))
      }

      render() {
        return <Component {...this.props} {...this.state} />
      }
    }

    return Layout
  }
}
