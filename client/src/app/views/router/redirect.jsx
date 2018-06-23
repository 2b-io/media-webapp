import { Component } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'

class Redirect extends Component {
  componentDidMount() {
    this.props.redirect(this.props.to)
  }

  render() {
    return null
  }
}

export default connect(
  null,
  mapDispatch({
    redirect: actions.requestLocation
  })
)(Redirect)
