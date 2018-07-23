import React from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'

const Message = styled.div`
  padding: 10px;
`
export default WrappedComponent => {
  const Input = ({ input, meta: { error, valid, touched }, hasValidator, ...props }) => (
    <div>
      <WrappedComponent
        { ...props }
        { ...input }
        valid={ hasValidator && valid && touched }
        invalid={ error && touched }
      />
      { error && touched &&
        <Message>{ error }</Message>
      }
    </div>
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
