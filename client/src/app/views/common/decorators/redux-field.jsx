import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'

const ErrorMessage = styled.div`
  padding: ${
    ({ theme: { spacing } }) => `
      ${ spacing.tiny }
      ${ spacing.small }
    `
  };
  border: 1px solid ${ ({ theme }) => theme.error.base };
  background: ${ ({ theme }) => theme.error.base };
  color: ${ ({ theme }) => theme.error.on.base };
`

export default WrappedComponent => {
  const Input = ({ input, meta: { error, valid, touched }, hasValidator, ...props }) => (
    <Fragment>
      <WrappedComponent
        { ...props }
        { ...input }
        valid={ hasValidator && valid && touched }
        invalid={ error && touched }
      />
      { error && touched &&
        <ErrorMessage>{ error }</ErrorMessage>
      }
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
