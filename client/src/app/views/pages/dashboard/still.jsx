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
  maximizeSidebar,
  showPinProjectDialog,
  hidePinProjectDialog,
  hidePinnedProjectMenu,
  updatePinnedProjects,
  ui: {
    idle,
    isPinProjectsDialogActive,
    pinnedProjects
  }
}) => (
  <Fragment>
    <MenuButton onClick={ maximizeSidebar } />
    <PageTitle>Dashboard</PageTitle>
    { idle  && <ContextMenu
      name={ 'pinnedProject' }
      content={ () => (
        <List
          interactable
          items={ [
            {
              content: () => <TextLine mostLeft mostRight>Customize pinned projects</TextLine>,
              onClick: () => {
                showPinProjectDialog()
                hidePinnedProjectMenu('pinnedProject')
              }
            }
          ] }
        />
      ) }
      />
    }
    <Dialog
      isActive={ isPinProjectsDialogActive }
      onOverlayClick={ hidePinProjectDialog }
      content={ () => (
        <PinProjectDialog
          idle={ idle }
          updatePinnedProjects={ updatePinnedProjects }
          allProjects={ allProjects }
          pinnedProjects={ pinnedProjects }
        />
      ) }
    />
  </Fragment>
)

export default connect(
  mapState({
    allProjects: selectors.allProjects
  }),
  mapDispatch({
    hidePinnedProjectMenu: actions.hideMenu,
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
