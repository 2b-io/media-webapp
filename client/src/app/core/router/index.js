import React, { Component } from 'react'
import { Router as BrowserRouter, Route, Switch } from 'react-router'

export class Router extends Component {
  render() {
    const { history } = this.props

    return (
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/splash" component={Splash} />
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
