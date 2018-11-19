import React from 'react'
import { FieldArray } from 'redux-form'

import { AddIcon, TrashIcon } from 'ui/icons'
import { PlainButton, ResponsiveGrid } from 'ui/elements'
import { TextBox } from 'views/common/form'

const CustomHeaderList = ({
  fields,
  idle
}) => (
  fields.map(
    (header, index) => (
      <ResponsiveGrid key={ index }
        breakpoints={ { otherwise: '1fr 1fr 40px' } }
        items={ [ {
          content: () => (
            <TextBox
              disabled={ !idle }
              label="Header Name"
              type="text"
              name={ `${ header }.name` }
            />
          )
        }, {
          content: () => (
            <TextBox
              disabled={ !idle }
              label="Header Value"
              type="text"
              name={ `${ header }.value` }
            />
          )
        }, {
          content: index === fields.length - 1 ?
            () => (
              <PlainButton
                disabled={ !idle }
                onClick={ () => fields.push({}) }
              >
                <AddIcon />
              </PlainButton>
            ) :
            () => (
              <PlainButton
                disabled={ !idle }
                onClick={ () => fields.remove(index) }
              >
                <TrashIcon />
              </PlainButton>
            )
        } ] }
      />
    )
  )
)

const CustomHeader = ({ idle }) => (
  <FieldArray
    idle={ idle }
    name="headers"
    component={ CustomHeaderList }
  />
)

export default CustomHeader
