import React from 'react'
import styled from 'styled-components'

import Align from './form-align'
import Description from './form-description'
import FormBody from './form-body'
import Header from './form-header'
import Line from './form-line'

const Form = ({ handleSubmit, children }) => (
  <FormBody onSubmit={ handleSubmit }>
    {children}
  </FormBody>
)

Form.Label = styled.div`
  font-size: 0.8em;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 6px;
  background: white;
  padding: ${ ({ theme }) => theme.spacing.tiny };
`

Form.Align = Align
Form.Description = Description
Form.Header = Header
Form.Line = Line

export default Form
