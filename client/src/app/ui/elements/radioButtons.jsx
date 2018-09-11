import React from 'react'
import styled, { css } from 'styled-components'
import { Radio } from 'ui/elements'
import { Field } from 'redux-form'

const Wrapper = styled.div`
  padding: 0 8px;
  display: grid;
  grid-gap: 8px;
  height: 32px;
  grid-template-columns: 1fr 32px;
`

const RadioButtons = ({ name, options }) => (
  <Field
    component={({ input, options }) => (
      options.map(option => <div key={option.id}>
        <Radio
          id={option.id}
          type='radio'
          {...input}
          value={option.value}
          checked={option.value === input.value}
          label={ option.label }
        />
      </div>)
    )}
    name={ name }
    options={ options }
  />
)


export default RadioButtons
