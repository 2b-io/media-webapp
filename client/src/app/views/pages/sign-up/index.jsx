import React from 'react'
import { connect } from 'react-redux'

import { actions } from 'state/interface'
import preventDefault from 'services/prevent-default'

const SignUp = ({ back }) => (
  <main>
    <h1>Sign Up</h1>
    <a href="/sign-in" onClick={ back }>Back</a>
  </main>
)

export default connect(
  null,
  dispatch => ({
    back: preventDefault(
      () => dispatch(actions.requestLocation('/sign-in'))
    )
  })
)(SignUp)
