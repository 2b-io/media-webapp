import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import styles from './styles'

import { redirect } from 'actions/location'

@connect()
@Radium
class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={styles.container}>
        <h1>HomePage</h1>
        <div>
          <button onClick={this._redirect.bind(this, '/sign-in')}>Sign In</button>
          <button onClick={this._redirect.bind(this, '/profile')}>Profile</button>
        </div>
      </div>
    )
  }

  _redirect(pathname) {
    let { dispatch } = this.props

    dispatch(redirect(pathname))
  }
}

export default HomePage
