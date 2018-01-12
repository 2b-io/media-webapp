import React from 'react'
import { connect } from 'react-redux'

import { redirect } from 'actions/routing'

export default Component => {

  @connect()
  class HyperLink extends React.Component {
    constructor(props) {
      super(props)

      this._redirect = this._redirect.bind(this)
    }

    render() {
      return (
        <Component {...this.props}
          href={this.props.link}
          onClick={this._redirect}
        />
      )
    }

    _redirect(e) {
      e.preventDefault()

      const { dispatch, link } = this.props

      dispatch(redirect(link))
    }
  }

  return HyperLink
}
