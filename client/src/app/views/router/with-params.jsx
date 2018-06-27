import React from 'react'

const withParams = WrappedComponent => {
  const WithParams = ({ match: { params }, ...props }) => {
    return (
      <WrappedComponent
        params={ params }
        { ...props }
      />
    )
  }

  return WithParams
}

export default withParams
