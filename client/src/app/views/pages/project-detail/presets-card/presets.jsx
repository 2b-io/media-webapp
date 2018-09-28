import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'
import { mapDispatch } from 'services/redux-helpers'
import { Card, Dialog, List, StatusIndicator } from 'ui/elements'
import { AddIcon } from 'ui/icons'
import { Heading, TextLine } from 'ui/typo'

import CreateDialog from './create-dialog'

const CREATE_PRESET = 'CREATE_PRESET'

const Presets = ({
  // dialog
  isCreateDialogActive,
  showCreateDialog,
  hideCreateDialog,
  identifier,
  presets = {},
  createPreset,
  toPreset
}) => {
  const items = Object.values(presets).map(
    ({ contentType, isActive }) => ({
      key: contentType,
      onClick: () => toPreset(identifier, contentType.replace('/', '_')),
      content: () => <TextLine mostRight>{ contentType }</TextLine>,
      leading: () => <StatusIndicator isActive={ isActive } />
    })
  )

  return (
    <Fragment>
      <Card
        title={ () => <Heading mostLeft mostRight>Presets</Heading> }
        fab={ () => <AddIcon onClick={ showCreateDialog } /> }
        content={ () => (
          items.length &&
            <List items={ items } /> ||
            <TextLine mostLeft mostRight>No preset found</TextLine>
        ) }
      />

      <Dialog
        isActive={ isCreateDialogActive }
        onOverlayClick={ hideCreateDialog }
        content={ () => (
          <CreateDialog
            identifier={ identifier }
            presets={ presets }
            createPreset={ (params) => {
              createPreset(params)
              hideCreateDialog()
            } }
          />
        ) }
      />
    </Fragment>
  )
}

export default connect(
  (state, { identifier }) => ({
    isCreateDialogActive: selectors.isDialogActive(state, CREATE_PRESET),
    presets: selectors.presets(state, identifier)
  }),
  mapDispatch({
    // dialog
    showCreateDialog: () => actions.showDialog(CREATE_PRESET),
    hideCreateDialog: () => actions.hideDialog(CREATE_PRESET),
    // preset
    createPreset: actions.createPreset,
    toPreset: (identifier, contentType) => actions.requestLocation(`/projects/${ identifier }/presets/${ contentType }`)
  })
)(Presets)
