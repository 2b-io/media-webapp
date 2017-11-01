import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import styles from './styles'

import history from 'core/history'

@Radium
class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.redirect = this.redirect.bind(this)
    this.redirectByRedux = this.redirectByRedux.bind(this)
  }

  render() {
    return (
      <div style={styles.container}>
        <h1>HomePage</h1>
        <div>
          <button onClick={this.redirect}>Sign In</button>
        </div>
        <div>
          <button onClick={this.redirectByRedux}>Sign In by Redux</button>
        </div>
      </div>
    )
  }

  redirect() {
    history.push('/sign-in')
  }

  redirectByRedux() {
    let { dispatch } = this.props

    dispatch({
      type: 'CHANGE_HISTORY',
      path: '/sign-in'
    })
  }
}

export default withRouter(connect()(HomePage))
