import React from 'react'

export default function AuthorizedRoute(Component) {
  let componentDidMount = Component.prototype.componentDidMount

  Component.prototype.componentDidMount = function(nextProps) {
    let { history } = this.props;

    console.log(`AuthorizedRoute:${Component.name}:componentDidMount`, history.location.pathname)

    if (componentDidMount && componentDidMount instanceof Function) {
      componentDidMount(nextProps)
    }
  }
}
