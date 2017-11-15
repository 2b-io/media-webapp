import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import { redirect } from 'actions/routing'

@connect()
@Radium
class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.redirectToHomePage = this.redirectToHomePage.bind(this)
  }

  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <div>
          <button onClick={this.redirectToHomePage}>HomePage</button>
        </div>
      </div>
    )
  }

  redirectToHomePage() {
    let { dispatch } = this.props

    dispatch(redirect('/'))
  }
}

export default SignIn
