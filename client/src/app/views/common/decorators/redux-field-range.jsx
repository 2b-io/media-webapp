import React, { Fragment } from 'react'
import { Field } from 'redux-form'

export default WrappedComponent => {
  const Range = ({
    hasValidator,
    input,
    ...props
  }) => {
  return (
    <Fragment>
      <WrappedComponent
        { ...props }
        onChange={ input.onChange }
        value={ parseInt(input.value) }
        valid={ hasValidator && props.meta.touched && props.meta.valid }
        invalid={ hasValidator && props.meta.touched && props.meta.error }
      />
    </Fragment>
  )}

  const ReduxFieldRange = props => (
    <Field
      component={ Range }
      type="range"
      hasValidator={ !!props.validate }
      { ...props }
    />
  )

  return ReduxFieldRange
}
