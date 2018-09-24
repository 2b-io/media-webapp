import React from 'react'
import styled from 'styled-components'

import { Heading, TextLine } from 'ui/typo'
import { Button, Card, ErrorBox, List, MenuMore, Paragraph } from 'ui/elements'
import { AddIcon, EditIcon, OwnerAddIcon, ReloadIcon } from 'ui/icons'

const LineWithButton = styled.div`
  display: grid;
  & > * {
    min-height: 0;
    min-width: 0;
  };
  grid-template-columns: 1fr 40px;
`


const PresetList = ({ presets }) => {

  const lists = presets ? Object.values(presets).map(
      (preset, index) => ({
        key: index,
        content: () => (
          <LineWithButton>
            <TextLine mostLeft mostRight>
              { preset.contentType }
            </TextLine>
            <MenuMore
              name={ preset.contentType }
              content={ () => (
                <List
                  items={ [
                    {
                      content: () => <TextLine mostLeft mostRight>Edit</TextLine>
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
    ): []

  return (
    <Card
      title={ () => <Heading mostLeft mostRight>Presets</Heading> }
      fab={ () => <AddIcon onClick={ () => toEditProject(project.identifier) } /> }
      content={ () => (
        !!lists.length ?
          <List items={ lists } />:
          <TextLine mostLeft mostRight>No preset found</TextLine>
      ) }
    />
  )
}

export default PresetList
