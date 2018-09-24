import React from 'react'
import styled from 'styled-components'

import { Heading, TextLine } from 'ui/typo'
import { Card, List, MenuMore } from 'ui/elements'
import { AddIcon } from 'ui/icons'

const LineWithButton = styled.div`
  display: grid;
  & > * {
    min-height: 0;
    min-width: 0;
  };
  grid-template-columns: 1fr 40px;
`

const Presets = ({
  presets = {},
  toPreset
}) => {
  const items = Object.values(presets).map(
    ({ contentType }, index) => ({
      key: contentType,
      content: () => (
        <LineWithButton>
          <TextLine mostLeft mostRight>
            { contentType }
          </TextLine>
          <MenuMore
            name={ contentType }
            content={ () => (
              <List
                items={ [
                  {
                    content: () => <TextLine mostLeft mostRight>Edit</TextLine>,
                    onClick: () => toPreset(contentType.replace('/', '_'))
                  },
                  {
                    content: () => <TextLine mostLeft mostRight>Disable</TextLine>
                  },
                  {
                    content: () => <TextLine mostLeft mostRight>Remove</TextLine>
                  }
                ] }
              />
            ) }
          />
        </LineWithButton>
      )
    })
  )

  return (
    <Card
      title={ () => <Heading mostLeft mostRight>Presets</Heading> }
      fab={ () => <AddIcon onClick={ () => toPreset('new') } /> }
      content={ () => (
        items.length &&
          <List items={ items } /> ||
          <TextLine mostLeft mostRight>No preset found</TextLine>
      ) }
    />
  )
}

export default Presets
