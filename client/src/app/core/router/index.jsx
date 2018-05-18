import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router as BrowserRouter, Route, Switch } from 'react-router'
import { request } from 'state-logic/location/actions'

export class Router extends Component {
  render() {
    const { history } = this.props

    return (
      <BrowserRouter history={history} context={{}}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/splash" component={Splash} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    )
  }
}

class Dashboard extends Component {
  render() {
    return <h1>Dashboard</h1>
  }
}

class Splash extends Component {
  render() {
    return <h1>Loading...</h1>
  }
}

@connect()
export class Redirect extends Component {
  componentWillMount() {
    const { dispatch, to } = this.props

    dispatch(request(to))
  }

  render() {
    return null
  }
}
