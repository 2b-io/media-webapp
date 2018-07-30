import React from 'react'
import styled, { css } from 'styled-components'

import { SuccessIcon, ErrorIcon } from 'ui/icons'


const Wrapper = styled.div`
  padding-top: ${
    ({ theme }) => theme.spacing.small
  };
  padding-bottom: ${
    ({ theme }) => theme.spacing.medium
  };
`

const Container = styled.div`
  display: flex;
`

const Input = styled.input.attrs({
  type: ({ type = 'checkbox' }) => type
})`
  width: 20px;
  height: 20px;
`

const CheckBox = ({
  label,
  ...props
}) => (
  <Wrapper>
    <Container { ...props }>
      {
        label && <div>{ label }</div>
      }
      {
        <Input { ...props } />
      }
    </Container>
  </Wrapper>
)

export default CheckBox
