import React from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container, Link } from 'ui/elements'

const SignUp = ({ toSignIn }) => (
  <main>
    <Container center size="small">
      <h1>Sign Up</h1>
      <Link href="/sign-in" onClick={ toSignIn }>Back</Link>
    </Container>
  </main>
)

export default connect(
  null,
  mapDispatch({
    toSignIn: () => actions.requestLocation('/sign-in')
  })
)(SignUp)
