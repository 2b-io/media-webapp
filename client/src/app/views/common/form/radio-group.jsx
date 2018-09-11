import React from 'react'
import { Field } from 'redux-form'
import { reduxField } from 'views/common/decorators'

import { Radio } from 'ui/elements'

const RadioGroup = ({ name, options }) => (
  <Field
    component={ ({ input }) => (
      options.map(
        (option, index) => (
          <Radio
            key={ index }
            { ...input }
            value={ option.value }
            checked={ option.value === input.value }
            label={ option.label }
            description={ option.description }
          />
        )
      )
    ) }
    name={ name }
  />
)

export default reduxField(RadioGroup)
