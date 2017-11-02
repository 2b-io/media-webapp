import React from 'react'

export default function AuthorizedRoute(Component) {
  let componentWillMount = Component.prototype.componentWillMount

  Component.prototype.componentWillMount = function(nextProps) {
    let { history } = this.props;

    console.log(`AuthorizedRoute:${Component.name}:componentWillMount`, history.location.pathname)

    if (componentWillMount && componentWillMount instanceof Function) {
      componentWillMount(nextProps)
    }
  }
}
