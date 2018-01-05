import React from 'react'
import { connect } from 'react-redux'

import { redirect, replace } from 'actions/location'

@connect()
class Redirect extends React.PureComponent {
  componentDidMount() {
    let { mode, path, dispatch, ui } = this.props

    if (mode === 'replace') {
      dispatch(replace(path))
    } else {
      dispatch(redirect(path))
    }
  }

  render() {
    return null
  }
}

export default Redirect
