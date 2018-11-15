import React from 'react'
import { FieldArray } from 'redux-form'
import styled from 'styled-components'

import { AddIcon, TrashIcon } from 'ui/icons'
import { PlainButton } from 'ui/elements'
import { TextBox } from 'views/common/form'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 40px;
  grid-column-gap: 8px
  & > * {
    min-width: 0;
    min-height: 0;
  }
  position: relative;
`
const WrapperButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const CustomHeaderList = ({
  fields,
  idle
}) => (
  fields.map(
    (header, index) => (
      <Wrapper key={ index }>
        <TextBox
          disabled={ !idle }
          label="Header Name"
          type="text"
          name={ `${ header }.name` }
        />
        <TextBox
          disabled={ !idle }
          label="Header Value"
          type="text"
          name={ `${ header }.value` }
        />
        <WrapperButton>
          { index === fields.length - 1 ?
            <PlainButton
              disabled={ !idle }
              onClick={ () => fields.push({}) }
            >
              <AddIcon />
            </PlainButton> :
            <PlainButton
              disabled={ !idle }
              onClick={ () => fields.remove(index) }
            >
              <TrashIcon />
            </PlainButton>
          }
        </WrapperButton>
      </Wrapper>
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
