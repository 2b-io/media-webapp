import React from 'react'
import styled from 'styled-components'
import { Button ,TextBox, FormLineBottom } from 'ui/elements'
import { FormLine } from 'ui/compounds'

const Form = styled.form`
  padding-bottom: 10px;
`

const ResetPwForm = ({ handleSubmit }) => (
  <FormLine
    header={'Resset password' }
    description={`Enter your new password `}
    handleSubmit={handleSubmit}
    >
    <FormLineBottom>
      <TextBox
        type="password"
        name="password"
        placeholder="New password"
        autoFocus
      />
    </FormLineBottom>
    <FormLineBottom>
      <TextBox
        type="password"
        name="rePassword"
        placeholder="Retype password"
        autoFocus
      />
    </FormLineBottom>
    <FormLineBottom last>
      <Button type="submit">Request reset password</Button>
    </FormLineBottom>
  </FormLine>
)

export default ResetPwForm
