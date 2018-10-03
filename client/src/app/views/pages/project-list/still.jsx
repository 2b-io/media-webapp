import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'

import {
  FilterIcon,
  MenuIcon,
  EyeIcon,
  EyeOffIcon,
  SortAscIcon,
  SortDescIcon,
  SortAlphaAscIcon,
  SortAlphaDescIcon,
  SortNumericAscIcon,
  SortNumericDescIcon
} from 'ui/icons'
import { ContextMenu, List } from 'ui/elements'
import { PageTitle, TextLine } from 'ui/typo'

const ProjectList = ({
  maximizeSidebar,
  sortProjects,
  toggleDisabledProjects,
  showFilterMenu, hideFilterMenu,
  ui: {
    isFilterMenuActive,
    hideDisabledProjects,
    sortAscending,
    sortType
  }
}) => (
  <Fragment>
    <MenuIcon onClick={ maximizeSidebar } />
    <PageTitle>Projects</PageTitle>
    <ContextMenu.Menu
      stateless={ true }
      isActive={ isFilterMenuActive }
      activate={ showFilterMenu }
      deactivate={ hideFilterMenu }
      icon={ () => <FilterIcon /> }
      content={ () => (
        <List
          items={ [
            {
              content: () => <TextLine mostLeft mostRight>Sort by privilege</TextLine>,
              onClick: () => sortProjects({ type: 'privilege', ascending: !sortAscending }),
              trailing: sortType === 'privilege' ? () =>  sortAscending ? <SortAscIcon /> : <SortDescIcon /> : null
            },
            {
              content: () => <TextLine mostLeft mostRight>Sort by name</TextLine>,
              onClick: () => sortProjects({ type: 'name', ascending: !sortAscending }),
              trailing: sortType === 'name' ? () =>  sortAscending ? <SortAlphaAscIcon /> : <SortAlphaDescIcon /> : null
            },
            {
              content: () => <TextLine mostLeft mostRight>Sort by created date</TextLine>,
              onClick: () => sortProjects({ type: 'created', ascending: !sortAscending }),
              trailing: sortType === 'created' ? () =>  sortAscending ? <SortNumericAscIcon /> : <SortNumericDescIcon /> : null
            },
            {
              content: () => (
                <TextLine mostLeft mostRight>
                  {
                    hideDisabledProjects ? 'Show disabled projects' : 'Hide disabled projects'
                  }
                </TextLine>
              ),
              onClick: toggleDisabledProjects.bind(null, !hideDisabledProjects),
              trailing: () => hideDisabledProjects ? <EyeIcon /> : <EyeOffIcon />
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
    sortProjects: actions.sortProjects,
    toggleDisabledProjects: actions.toggleDisabledProjects,
    maximizeSidebar: actions.maximizeSidebar,
    showFilterMenu: () => actions.showMenu('FILTER_PROJECTS'),
    hideFilterMenu: () => actions.hideMenu('FILTER_PROJECTS')
  })
)(ProjectList)
