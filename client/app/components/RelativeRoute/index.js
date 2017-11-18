import React from 'react'
import { Route } from 'react-router'

class RelativeRoute extends React.PureComponent {
  render() {
    let { match, path, component:Component } = this.props

    return <Route path={`${match.path}/${path}`} {...this.props} />
  }
}

export default RelativeRoute
