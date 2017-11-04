import React from 'react'
import { Route } from 'react-router'

import { loadableContainer } from 'services/loadable'

let HomePage = loadableContainer('HomePage')
let Profile = loadableContainer('Profile')
let SignIn = loadableContainer('SignIn')

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello world!</h1>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/profile" component={Profile} />
      </div>
    )
  }
}

export default App
