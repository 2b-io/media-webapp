import React from 'react'
import { connect } from 'react-redux'

import { redirect } from 'actions/routing'
import { clearState } from 'actions/ui-state'

@connect()
class Redirect extends React.PureComponent {
  componentDidMount() {
    let { path, dispatch } = this.props

    dispatch(clearState())
    dispatch(redirect(path))
  }

  render() {
    return null
  }
}

export default Redirect
