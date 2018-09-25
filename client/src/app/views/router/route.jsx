import React from 'react'
import { Route as NativeRoute } from 'react-router'

const Route = ({ children, ...props }) => (
  <NativeRoute
    { ...props }
    render={ (props) => React.Children.map(
      children,
      child => React.cloneElement(child, props)
    ) }
  />
)

export default Route
