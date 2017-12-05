import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import { InternalLink } from 'components/Link'
import Layout, { SYSTEM_MODE } from 'decorators/Layout'

import styles from './styles'

@connect()
@Layout(SYSTEM_MODE)
@Radium
class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={styles.container}>
        <p>
          <span>Already using MediaOnDemand? </span>
          <InternalLink link="/sign-in">Sign in</InternalLink>
        </p>
      </div>
    )
  }
}

export default HomePage
