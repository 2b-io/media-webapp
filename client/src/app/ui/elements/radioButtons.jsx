import React from 'react'
import { Nowrap, Radio } from 'ui/elements'
import { Field } from 'redux-form'

const RadioButtons = ({ name, options }) => (
  <Field
    component={ ({ input, options }) => (
      options.map(
        (option, index) => (
          <Nowrap key={ index }>
            <Radio
              id={ index }
              type='radio'
              { ...input }
              value={ option.value }
              checked={ option.value === input.value }
              label={ option.label }
            />
          </Nowrap>
        )
      )
    ) }
    name={ name }
    options={ options }
  />
)


export default RadioButtons
