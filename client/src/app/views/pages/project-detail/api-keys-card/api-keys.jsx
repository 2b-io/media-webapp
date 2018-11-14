import React from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Heading, TextLine } from 'ui/typo'
import { Card, ContextMenu, List, StatusIndicator } from 'ui/elements'
import { AddIcon } from 'ui/icons'

const ApiKeys = ({
  createApiKey,
  identifier,
  secretKeys = {},
  removeSecretKey,
  updateSecretKey
}) => {

  const lists = Object.values(secretKeys).map(
    ({ key, isActive }) => ({
      key,
      content: () => <TextLine>{ key }</TextLine>,
      leading: () => <StatusIndicator isActive={ isActive } />,
      trailing: () => (
        <ContextMenu
          name={ `secret-key-${ key }` }
          content={ () => (
            <List
              interactable={ true }
              items={ [
                {
                  content: () => <TextLine mostLeft mostRight>{ isActive ? 'Disable' : 'Enable' }</TextLine>,
                  onClick: () => updateSecretKey(identifier, { key, isActive: !isActive })
                },
                {
                  content: () => <TextLine mostLeft mostRight>Remove</TextLine>,
                  onClick: () => removeSecretKey(identifier, key)
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
      fab={ () => <AddIcon onClick={ () => createApiKey(identifier) } /> }
      content={ () => (
        lists.length > 0 &&
          <List items={ lists } /> ||
          <TextLine mostLeft mostRight>No secret key</TextLine>
      ) }
    />
  )
}

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    if (!identifier) {
      return {}
    }

    return {
      identifier,
      secretKeys: selectors.secretKeys(state, identifier)
    }
  },
  mapDispatch({
    createApiKey: actions.createSecretKey,
    removeSecretKey: actions.removeSecretKey,
    updateSecretKey: actions.updateSecretKey
  })
)(ApiKeys)
