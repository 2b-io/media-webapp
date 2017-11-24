import Radium from 'radium'
import React from 'react'
import BreakPoint from 'components/BreakPoint'
import Orientation from 'components/Orientation'

import SignInForm from './SignInForm'

@Radium
class SignIn extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="sign-in-container">
        <div>
          <SignInForm onSubmit={this._handleSubmit} />
        </div>
      </div>
    )
  }

  _handleSubmit(form) {
    console.log(form)
  }
}

export default SignIn
