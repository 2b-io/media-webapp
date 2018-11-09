import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { PageTitle, TextLine } from 'ui/typo'
import { ContextMenu, Dialog, List } from 'ui/elements'
import { MenuButton } from 'views/common/compounds'

import PinProjectDialog from './pin-project-dialog'

const PIN_PROJECT = 'PIN_PROJECT'

const Dashboard = ({
  allProjects,
  pinnedProjectIdentifiers,
  maximizeSidebar,
  showPinProjectDialog,
  hidePinProjectDialog,
  updatePinnedProjects,
  ui: {
    idle,
    isPinProjectsDialogActive
  }
}) => (
  <Fragment>
    <MenuButton onClick={ maximizeSidebar } />
    <PageTitle>Dashboard</PageTitle>
    <ContextMenu
      name={ 'pinnedProject' }
      content={ () => (
        <List
          items={ [
            {
              content: () => <TextLine mostLeft mostRight>Pin project</TextLine>,
              onClick: () => showPinProjectDialog({})
            }
          ] }
        />
      ) }
    />
    <Dialog
      isActive={ isPinProjectsDialogActive }
      onOverlayClick={ hidePinProjectDialog }
      content={ () => (
        <PinProjectDialog
          idle={ idle }
          updatePinnedProjects={ updatePinnedProjects }
          allProjects={ allProjects }
          pinnedProjectIdentifiers={ pinnedProjectIdentifiers }
        />
      ) }
    />
  </Fragment>
)

export default connect(
  mapState({
    pinnedProjectIdentifiers: selectors.pinnedProjectIdentifiers,
    allProjects: selectors.allProjects
  }),
  mapDispatch({
    showPinProjectDialog: () => actions.showDialog(PIN_PROJECT),
    hidePinProjectDialog: () => actions.hideDialog(PIN_PROJECT),
    updatePinnedProjects: (listPinnedProjects) => {
      const pinnedProjectIdentifiers = Object.keys(listPinnedProjects).reduce((keys, key) => {
        if (listPinnedProjects[ key ] === true) {
          return [ ...keys, key ]
        }
        return keys
      }, [])
      return actions.updatePinnedProjects(pinnedProjectIdentifiers)
    },
    maximizeSidebar: actions.maximizeSidebar
  })
)(Dashboard)
