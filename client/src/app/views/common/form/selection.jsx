import React from 'react'
import { Field } from 'redux-form'

import { Select } from 'ui/elements'

const Selection = props => (
  <Field
    component={ Select }
    type="select"
    { ...props }
  />
)

export default Selection
