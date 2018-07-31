import React from 'react'
import styled, { css } from 'styled-components'


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
  type: 'checkbox'
})`
  width: 20px;
  height: 20px;
`

const CheckBox = ({ label, ...props }) => (
  <Wrapper>
    <Container { ...props }>
      <label > { label } </label>
      <div>
        <Input { ...props } />
      </div>
    </Container>
  </Wrapper>
)

export default CheckBox
