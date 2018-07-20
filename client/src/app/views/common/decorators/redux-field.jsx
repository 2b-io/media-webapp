import React from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'

const Message = styled.div`
  padding: 10px;
`
export default WrappedComponent => {
  const Input = ({ input, meta: { error, valid, touched }, isValid, ...props }) => (
    <div>
      <WrappedComponent
        { ...props }
        { ...input }
        valid={ valid && touched && isValid }
        invalid={ error && touched && isValid }
      />
      { error && touched &&
        <Message>{ error }</Message>
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
