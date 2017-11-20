import React from 'react'
import { Route } from 'react-router'

import { loadableContainer } from 'helpers/loadable'

import DefaultLayout from 'containers/App/DefaultLayout'

const SignIn = loadableContainer('SignIn')

const Home = loadableContainer('Home')
const Profile = loadableContainer('Profile')

class App extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/sign-in" component={SignIn} />
        <DefaultLayout exact path="/" component={Home} />
        <DefaultLayout path="/profile" component={Profile} />
      </div>
    )
  }
}

export default App
