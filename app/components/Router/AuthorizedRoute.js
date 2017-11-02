import React from 'react'

export default function AuthorizedRoute(Component) {
  let componentWillMount = Component.prototype.componentWillMount

  Component.prototype.componentWillMount = function(nextProps) {
    console.log(`AuthorizedRoute:${Component.name}:componentWillMount`, this.props)

    if (componentWillMount && componentWillMount instanceof Function) {
      componentWillMount(nextProps)
    }
  }
}
