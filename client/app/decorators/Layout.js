import React from 'react'
import { connect } from 'react-redux'

import { LAYOUT, changeLayout } from 'actions/layout'

const layout = mode => {
  return Component => {
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

export default layout
export const SystemLayout = layout(LAYOUT.SYSTEM_MODE)
