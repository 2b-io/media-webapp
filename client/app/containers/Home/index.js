import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import styles from './styles'

import { LinkButton } from 'components/Button'

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
          <LinkButton link="/sign-in">Sign In</LinkButton>
          <LinkButton link="/profile">Profile</LinkButton>
        </div>
      </div>
    )
  }
}

export default HomePage
