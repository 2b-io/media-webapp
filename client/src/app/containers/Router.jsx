import React, { Component } from 'react'
import { Route, Router, Switch } from 'react-router'

import Home from 'containers/routes/Home'

export default class ReduxRouter extends Component {
  render() {
    const { children, history } = this.props

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    )
  }
}
