import React from 'react'
import { connect } from 'react-redux'
import { redirect } from 'actions/location'

@connect()
class Redirect extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    let { path, dispatch } = this.props

    dispatch(redirect(path))
  }

  render() {
    return null
  }
}

export default Redirect
