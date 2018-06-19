import React from 'react'
import styled from 'styled-components'
import { Button ,TextBox, FormLineBottom } from 'ui/elements'
import { FormLine } from 'ui/compounds'

const forgotPwForm = ({handleSubmit}) => (
  <FormLine
    header={'Forgot password' }
    description={`Enter your email address below and click on the 'Request reset password ' button `}
    handleSubmit={handleSubmit}
    >
    <FormLineBottom>
      <TextBox
        type="email"
        name="email"
        placeholder="Your email"
        autoFocus
      />
    </FormLineBottom>
    <FormLineBottom last>
      <Button type="submit">Request reset password</Button>
    </FormLineBottom>
  </FormLine>
)

export default forgotPwForm
