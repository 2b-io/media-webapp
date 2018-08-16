import React from 'react'

import { TextBox } from 'ui/elements'

const AccountInfo = ({ account }) => (
  <TextBox
    label="Email"
    disabled={ true }
    defaultValue={ account && account.email }
  />
)

export default AccountInfo
