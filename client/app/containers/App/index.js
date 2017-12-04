import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'

import { loadableContainer } from 'helpers/loadable'

import Header from 'containers/App/Header'
import DefaultLayout from 'containers/App/DefaultLayout'

const SignIn = loadableContainer('SignIn')
const SignUp = loadableContainer('SignUp')
const Dashboard = loadableContainer('Dashboard')
const Home = loadableContainer('Home')
const Profile = loadableContainer('Profile')

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Profile} />
        </div>
      </div>
    )
  }
}

export default App
