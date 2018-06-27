import React from 'react'
import { Field } from 'redux-form'

export default WrappedComponent => {
  const Input = ({ input, ...props }) => (
    <WrappedComponent
      { ...props }
      { ...input }
    />
  )

  const ReduxField = props => (
    <Field
      component={ Input }
      { ...props }
    />
  )

  return ReduxField
}
