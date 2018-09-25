import React from 'react'

import { Heading, TextLine } from 'ui/typo'
import { Card, List, MenuMore } from 'ui/elements'
import { AddIcon } from 'ui/icons'

const ApiKeys = ({
  secretKeys = {},
  createApiKey,
  removeSecretKey,
  updateSecretKey
}) => {

  const lists = Object.values(secretKeys).map(
    ({ key, isActive }) => ({
      key: key,
      content: () => <TextLine mostLeft mostRight>{ key }</TextLine>,
      trailing: () => (
        <MenuMore
          name={ key }
          content={ () => (
            <List
              items={ [
                {
                  content: () => <TextLine mostLeft mostRight>{ isActive ? 'Disable' : 'Enable' }</TextLine>,
                  onClick: () => updateSecretKey({ key, isActive: !isActive })
                },
                {
                  content: () => <TextLine mostLeft mostRight>Remove</TextLine>,
                  onClick: () => removeSecretKey(key)
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
      title={ () => <Heading mostLeft mostRight>API Keys</Heading> }
      fab={ () => <AddIcon onClick={ createApiKey } /> }
      content={ () => (
        lists.length > 0 &&
          <List items={ lists } /> ||
          <TextLine mostLeft mostRight>No secret key</TextLine>
      ) }
    />
  )
}

export default ApiKeys
