import React from 'react'

import BreakPoint from 'components/BreakPoint'
import Orientation from 'components/Orientation'
import SignInForPhone from './index.phone'

class SignIn extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="sign-in-container">
        <BreakPoint name="phone">
          <div>Top Menu</div>
        </BreakPoint>
        <SignInForPhone />
        <BreakPoint name="medium">
          <div>Left Menu</div>
          <div>Extra content for tablet</div>
        </BreakPoint>
        <BreakPoint name="large">
          <div>Extra content for desktop</div>
        </BreakPoint>
        <Orientation name="portrait">
          <div>man hinh doc</div>
        </Orientation>
        <Orientation name="landspace">
          <div>man hinh ngang</div>
        </Orientation>
      </div>
    )
  }
}

export default SignIn
