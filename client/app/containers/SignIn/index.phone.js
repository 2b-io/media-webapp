import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import LinkButton from 'components/decorated/LinkButton'

@connect()
@Radium
class SignInForPhone extends React.Component {
  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <div>
          <LinkButton link="/">HomePage</LinkButton>
        </div>
      </div>
    )
  }
}

export default SignInForPhone
