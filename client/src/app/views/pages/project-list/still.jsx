import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'

import { FilterIcon, MenuIcon, CheckIcon } from 'ui/icons'
import { ContextMenu, List } from 'ui/elements'
import { PageTitle, TextLine } from 'ui/typo'
import { stateful } from 'views/common/decorators'

const ProjectList = ({
  maximizeSidebar,
  sortProjects,
  toggleDisabledProjects,
  ui: {
    toggleDisabledProjects: hideProjects,
    sortCondition
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
              onClick: () => sortProjects('privilege'),
              trailing: sortCondition === 'privilege' ? () => <CheckIcon /> : null
            },
            {
              content: () => <TextLine mostLeft mostRight>Sort by name</TextLine>,
              onClick: () => sortProjects('name'),
              trailing: sortCondition === 'name' ? () => <CheckIcon /> : null
            },
            {
              content: () => <TextLine mostLeft mostRight>Sort by created date</TextLine>,
              onClick: () => sortProjects('created'),
              trailing: sortCondition === 'created' ? () => <CheckIcon /> : null
            },
            {
              content: () => (
                <TextLine mostLeft mostRight>
                  {
                    hideProjects ? 'Show disabled projects' : 'Hide disabled projects'
                  }
                </TextLine>
              ),
              onClick: toggleDisabledProjects
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
