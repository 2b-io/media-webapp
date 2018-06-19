import React from 'react'
import styled from 'styled-components'
import HeaderForm from './header-form'
import Description from './description-form'

const Form = styled.form`
  padding-bottom: 10px;
`

const FormLine = ({handleSubmit, header, description, children }) => (
  <Form onSubmit={handleSubmit}>
    <HeaderForm>
      {header}
    </HeaderForm>
    <Description>
      {description}
    </Description>
    {children}
  </Form>
)

export default FormLine
