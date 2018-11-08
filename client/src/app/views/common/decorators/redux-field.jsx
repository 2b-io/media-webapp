import React, { Fragment } from 'react'
import { Field } from 'redux-form'

export default WrappedComponent => {
  const Input = ({
    hasValidator,
    input,
    ...meta,
    ...props
  }) => (
    <Fragment>
      <WrappedComponent
        { ...props }
        { ...input }
        { ...meta }
        valid={ hasValidator && meta.meta.touched && meta.meta.valid }
        invalid={ meta.meta.touched && meta.meta.error }
      />
    </Fragment>
  )

  const ReduxField = props => (
    <Field
      component={ Input }
      hasValidator={ props.validate }
      { ...props }
    />
  )

  return ReduxField
}
