import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import style from 'containers/Auth/SignIn.style'

import LinkButton from 'components/decorated/LinkButton'

@connect()
@Radium
class SignIn extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={style.container}>
        <h1>Sign In</h1>
        <div>
          <LinkButton link="/">HomePage</LinkButton>
        </div>
      </div>
    )
  }
}

export default SignIn
