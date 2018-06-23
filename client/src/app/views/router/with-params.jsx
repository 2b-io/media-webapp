import React from 'react'

const withParams = WrappedComponent => ({ match: { params }, ...props }) => {
  return (
    <WrappedComponent
      params={ params }
      { ...props }
    />
  )
}

export default withParams
