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
  createApiKey,
  removeSecretKey,
  updateSecretKey
}) => {

  const lists = secretKeys ? Object.values(secretKeys).map(
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
                    content: () => {
                      return (
                        <TextLine
                          mostLeft
                          mostRight
                          onClick={ () => { updateSecretKey( { key: secretKey.key, isActive: !secretKey.isActive } ) } }
                        >
                          {secretKey.isActive ? 'Disable' : 'Enable' }
                        </TextLine>
                      )
                    }
                  },
                  {
                    content: () => {
                      return (
                        <TextLine
                          mostLeft
                          mostRight
                          onClick={ () => { removeSecretKey(secretKey.key) } }
                        >
                          Remove
                        </TextLine>
                      )
                    }
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
      fab={ () => <AddIcon onClick={ createApiKey } /> }
      content={ () => (
        lists.length>0 ?
          <List items={ lists } />:
          <TextLine mostLeft mostRight>No preset found</TextLine>
      ) }
    />
  )
}

export default ApiKeys
