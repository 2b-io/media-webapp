import React from 'react'
import { connect } from 'react-redux'

import { actions } from 'state/interface'
import preventDefault from 'services/prevent-default'
import { Container } from 'ui/elements'

const SignUp = ({ back }) => (
  <main>
    <Container center size="small">
      <h1>Sign Up</h1>
      <a href="/sign-in" onClick={ back }>Back</a>
    </Container>
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
