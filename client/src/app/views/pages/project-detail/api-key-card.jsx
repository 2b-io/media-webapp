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


const ApiKeys = ({
  secretKeys,
  toCreateApiKey
}) => {

  const lists = secretKeys ? secretKeys.map(
    (secretKey, index) => ({
      key: index,
      content: () => (
        <LineWithButton>
          <TextLine mostLeft mostRight>
            { secretKey.key }
          </TextLine>
          <MenuMore
            name={ secretKey.key }
            content={ () => (
              <List
                items={ [
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
      title={ () => <Heading mostLeft mostRight>API Keys</Heading> }
      fab={ () => <AddIcon onClick={ toCreateApiKey } /> }
      content={ () => (
        lists.length>0 ?
          <List items={ lists } /> :
          <TextLine mostLeft mostRight>No preset found</TextLine>
      ) }
    />
  )
}

export default ApiKeys
