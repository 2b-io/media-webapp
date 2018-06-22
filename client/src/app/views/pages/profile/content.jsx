import React from 'react'
import { withParams } from 'views/router'

const Profile = ({ params: { username } }) => (
  <main>
    <h1>Profile of { username }</h1>
  </main>
)

export default withParams(Profile)
