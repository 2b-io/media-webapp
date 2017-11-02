import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import styles from './styles'

@Radium
class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.redirect = this.redirect.bind(this)
  }

  render() {
    return (
      <div style={styles.container}>
        <h1>HomePage</h1>
        <div>
          <button onClick={this.redirect}>Sign In</button>
        </div>
      </div>
    )
  }

  redirect() {
    let { dispatch } = this.props

    dispatch({
      type: 'HISTORY_CHANGING',
      pathname: '/sign-in'
    })
  }
}

export default withRouter(connect()(HomePage))
