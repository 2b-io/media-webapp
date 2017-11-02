import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import styles from './styles'

import AuthorizedRoute from 'components/Router/AuthorizedRoute'

@connect()
@Radium
@AuthorizedRoute
class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.redirect = this.redirect.bind(this)
  }

  componentWillMount() {
    console.log('HomePage:componentWillMount')
  }

  render() {
    return (
      <div style={styles.container}>
        <h1>HomePage</h1>
        <div>
          <button onClick={this.redirect.bind(this, '/sign-in')}>Sign In</button>
          <button onClick={this.redirect.bind(this, '/profile')}>Profile</button>
        </div>
      </div>
    )
  }

  redirect(pathname) {
    let { dispatch } = this.props

    dispatch({
      type: 'HISTORY_CHANGING',
      pathname
    })
  }
}

export default HomePage
