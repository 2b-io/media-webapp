import React from 'react'
import { Field } from 'redux-form'

export default WrappedComponent => {
  const Input = ({ input, meta: { error, valid, touched }, ...props }) => (
    <div>
      <WrappedComponent
        { ...props }
        { ...input }
        valid={ valid && touched }
        error={ error && touched }
      />
      { error && touched &&
        <p>{ error }</p>
      }
    </div>
  )

  const ReduxField = props => (
    <Field
      component={ Input }
      { ...props }
    />
  )

  return ReduxField
}
