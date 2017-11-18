import React from 'react'
import { connect } from 'react-redux'

import { redirect } from 'actions/location'

export default function(Component) {

  @connect()
  class HyperLink extends React.Component {
    constructor(props) {
      super(props)

      this._redirect = this._redirect.bind(this)
    }

    render() {
      return <Component {...this.props} onClick={this._redirect} />
    }

    _redirect() {
      const { dispatch, link } = this.props

      dispatch(redirect(link))
    }
  }

  return HyperLink
}
