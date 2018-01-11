import React from 'react'
import { connect } from 'react-redux'

import { redirect } from 'actions/routing'

@connect()
class Redirect extends React.PureComponent {
  componentDidMount() {
    let { path, dispatch } = this.props

    dispatch(redirect(path))
  }

  render() {
    return null
  }
}

export default Redirect
