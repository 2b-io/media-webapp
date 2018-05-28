import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'state/interface'

@connect(
  state => ({}),
  dispatch => ({
    redirect: pathname => dispatch(actions.requestLocation(pathname))
  })
)
export default class Redirect extends Component {
  componentDidMount() {
    this.props.redirect(this.props.to)
  }

  render() {
    return null
  }
}
