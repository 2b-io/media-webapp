import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router'

export default ({ history, config }) => (
  <Router history={history}>
    <Switch>
      { config.map(props => <Route {...props} key={props.path} />) }
    </Switch>
  </Router>
)
