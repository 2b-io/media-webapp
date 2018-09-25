import React from 'react'

import { Heading, TextLine } from 'ui/typo'
import { Card, List, MenuMore } from 'ui/elements'
import { AddIcon } from 'ui/icons'

const Presets = ({
  presets = {},
  toPreset
}) => {
  const items = Object.values(presets).map(
    ({ contentType }) => ({
      key: contentType,
      content: () => <TextLine mostLeft mostRight>{ contentType }</TextLine>,
      trailing: () => (
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
