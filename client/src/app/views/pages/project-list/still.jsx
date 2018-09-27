import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'

import {
  FilterIcon,
  MenuIcon,
  CheckIcon,
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
import { stateful } from 'views/common/decorators'

const ProjectList = ({
  maximizeSidebar,
  sortProjects,
  toggleDisabledProjects,
  ui: {
    toggleDisabledProjects: hideProjects,
    sortCondition : { type, ascending }
  }
}) => (
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
              content: () => <TextLine mostLeft mostRight>Sort by privilege</TextLine>,
              onClick: () => sortProjects({ type: 'privilege', ascending: !ascending }),
              trailing: type === 'privilege' ? () =>  ascending ? <SortAscIcon /> : <SortDescIcon /> : null
            },
            {
              content: () => <TextLine mostLeft mostRight>Sort by name</TextLine>,
              onClick: () => sortProjects({ type: 'name', ascending: !ascending }),
              trailing: type === 'name' ? () =>  ascending ? <SortAlphaAscIcon /> : <SortAlphaDescIcon /> : null
            },
            {
              content: () => <TextLine mostLeft mostRight>Sort by created date</TextLine>,
              onClick: () => sortProjects({ type: 'created', ascending: !ascending }),
              trailing: type === 'created' ? () =>  ascending ? <SortNumericAscIcon /> : <SortNumericDescIcon /> : null
            },
            {
              content: () => (
                <TextLine mostLeft mostRight>
                  {
                    hideProjects ? 'Show disabled projects' : 'Hide disabled projects'
                  }
                </TextLine>
              ),
              onClick: toggleDisabledProjects,
              trailing: () => hideProjects ? <EyeIcon /> : <EyeOffIcon />
            }
          ] }
        />
      ) }
    />
  </Fragment>
)
export default stateful({
  component: 'ProjectList'
})(
  connect(
    null,
    mapDispatch({
      sortProjects: actions.sortProjects,
      toggleDisabledProjects: actions.toggleDisabledProjects,
      maximizeSidebar: actions.maximizeSidebar
    })
  )(ProjectList)
)
