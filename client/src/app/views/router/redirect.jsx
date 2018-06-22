import { Component } from 'react'
import { connect } from 'react-redux'
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
  state => ({}),
  dispatch => ({
    redirect: pathname => dispatch(actions.requestLocation(pathname))
  })
)(Redirect)
