import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'

import { FilterIcon, MenuIcon } from 'ui/icons'
import { ContextMenu, List } from 'ui/elements'
import { PageTitle, TextLine } from 'ui/typo'

const ProjectList = ({ maximizeSidebar }) => (
  <Fragment>
    <MenuIcon onClick={ maximizeSidebar } />
    <PageTitle>Projects</PageTitle>
    <ContextMenu
      name="projectFilter"
      icon={ () => <FilterIcon /> }
      content={ () => (
        <List
          items={ [
            {
              content: () => <TextLine mostLeft mostRight>Sort by privilege</TextLine>
            },
            {
              content: () => <TextLine mostLeft mostRight>Sort by name</TextLine>
            },
            {
              content: () => <TextLine mostLeft mostRight>Sort by created date</TextLine>
            },
            {
              content: () => <TextLine mostLeft mostRight>Hide disabled projects</TextLine>
            }
          ] }
        />
      ) }
    />
  </Fragment>
)

export default connect(
  null,
  mapDispatch({
    maximizeSidebar: actions.maximizeSidebar
  })
)(ProjectList)
