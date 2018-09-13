import React, { Fragment }  from 'react'
import { FieldArray } from 'redux-form'
import styled from 'styled-components'

import { TrashIcon } from 'ui/icons'
import { Button } from 'ui/elements'
import { TextBox } from 'views/common/form'
import { validateRequired } from 'views/common/validate'


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

const CustomHeaderList = ({ fields }) => (
  fields.map(
    (header, index) => (
      <Wrapper key={ index }>
        <TextBox
          label="Header Name"
          type="text"
          name={ `${ header }.name` }
          placeholder="X-Pull"
          validate={ validateRequired }
        />
        <TextBox
          label="Header Value"
          type="text"
          name={ `${ header }.value` }
          placeholder="Media CDN"
          validate={ validateRequired }
        />
        <StyleButton>
          <Button plain onClick={ () => fields.remove(index) }>
            <TrashIcon />
          </Button>
        </StyleButton>
      </Wrapper>
    )
  )
)

const CustomHeader = () => (
  <FieldArray
    name="headers"
    component={ ({ fields }) => (
      <Fragment>
        {
          fields.length ?
          <CustomHeaderList
            fields={ fields }
          />:
          <p>There is no custom header yet.</p>
        }
        <Button variant="secondary" onClick={ () => fields.push({ }) }>
          Add more header
        </Button>
      </Fragment>
    ) }
  />
)

export default CustomHeader
