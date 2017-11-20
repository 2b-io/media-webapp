import React from 'react'

import BreakPoint from 'components/BreakPoint'
import SignInForPhone from './index.phone'

class SignIn extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="sign-in-container">
        <BreakPoint name="phone">
          <SignInForPhone />
        </BreakPoint>
      </div>
    )
  }
}

export default SignIn
