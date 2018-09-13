import React from 'react'
import { FieldArray } from 'redux-form'
import styled from 'styled-components'

import { AddIcon, TrashIcon } from 'ui/icons'
import { Button } from 'ui/elements'
import { TextBox } from 'views/common/form'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 40px;
  column-gap: 8px
  & > * {
    min-width: 0;
    min-height: 0;
  }
  position: relative;
`

const StyleButton = styled.div`
  padding-bottom: 24px;
`

const CustomHeaderList = ({ fields, addHeader }) => {

  if (!fields.length) {
    fields=[ { } ]
  }

  return (
    fields.map(
      (header, index) => (
        <Wrapper key={ index }>
          <TextBox
            label="Header Name"
            type="text"
            name={ `${ header }.name` }
            placeholder="X-Pull"
          />
          <TextBox
            label="Header Value"
            type="text"
            name={ `${ header }.value` }
            placeholder="Media CDN"
          />
          <StyleButton>
            { index === fields.length - 1 ?
              <Button plain onClick={ addHeader }>
                <AddIcon />
              </Button> :
              <Button plain onClick={ () => fields.remove(index) }>
                <TrashIcon />
              </Button>

            }
          </StyleButton>
        </Wrapper>
      )
    )
  )
}

const CustomHeader = () => (
  <FieldArray
    name="headers"
    component={ ({ fields }) => (
      <CustomHeaderList
        fields={ fields }
        addHeader={ () => fields.push({}) }
      />
    ) }
  />
)


export default CustomHeader
