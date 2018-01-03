import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'

import { loadableContainer } from 'helpers/loadable'

import Header from 'containers/App/Header'
import Footer from 'containers/App/Footer'
import PersonalDrawer from 'containers/PersonalDrawer'
import SystemDrawer from 'containers/SystemDrawer'

import style from './style'

const SignIn = loadableContainer('SignIn')
const SignUp = loadableContainer('SignUp')
const Dashboard = loadableContainer('Dashboard')
const Home = loadableContainer('Home')
const Profile = loadableContainer('Profile')
const Project = loadableContainer('Project')

class App extends React.Component {
  render() {
    return [
      <PersonalDrawer key="personal-drawer" />,
      <SystemDrawer key="system-drawer" />,
      <div id="page-wrap" style={style.wrapper} key="page-wrap">
        <Header />
        <section style={style.content}>
          <Route exact path="/sign-in"
            component={SignIn} />
          <Route exact path="/sign-up"
            component={SignUp} />
          <Route exact path="/"
            component={Home} />
          <Route exact path="/dashboard"
            component={Dashboard} />
          <Route path="/profile"
            component={Profile} />
          <Route exact path="/projects/:action/:slug?"
            component={Project} />
        </section>
        <Footer />
      </div>
    ]
  }
}

export default App
