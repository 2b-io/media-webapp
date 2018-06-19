import React from 'react'
import styled from 'styled-components'

import Align from './form-align'
import Description from './form-description'
import FormBody from './form-body'
import Header from './form-header'
import Line from './form-line'

const Form = ({handleSubmit, children }) => (
  <FormBody onSubmit={handleSubmit}>
    {children}
  </FormBody>
)

 Form.Align = Align
 Form.Description = Description
 Form.Header = Header
 Form.Line = Line

export default Form
