import React, { Fragment } from 'react'
import { Field } from 'redux-form'

export default WrappedComponent => {
  const Input = ({
    hasValidator,
    input,
    meta: { error, valid, touched, ...meta },
    ...props
  }) => (
    <Fragment>
      <WrappedComponent
        { ...props }
        { ...input }
        { ...meta }
        valid={ hasValidator && touched && valid }
        invalid={ touched && error }
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
