import React from 'react'

const withParams = WrappedComponent => {
  console.warn('withParams() is deprecated, use `selectors.currentParams()` instead...')

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
