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
  hideDisableProjects,
  ui: {
    hideDisableProjects: hideProjects,
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
              onClick: () => { sortProjects('privilege') },
              trailing: () => sortCondition === 'privilege' && <CheckIcon />
            },
            {
              content: () => <TextLine mostLeft mostRight>Sort by name</TextLine>,
              onClick: () => { sortProjects('name') },
              trailing: () => sortCondition === 'name' && <CheckIcon />
            },
            {
              content: () => <TextLine mostLeft mostRight>Sort by created date</TextLine>,
              onClick: () => { sortProjects('created') },
              trailing: () => sortCondition === 'created' && <CheckIcon />
            },
            {
              content: () => (
                <TextLine mostLeft mostRight>
                  {
                    !hideProjects? 'Hide disabled projects' : 'Show disabled projects'
                  }
                </TextLine>
              ),
              onClick: () => { hideDisableProjects() }
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
      hideDisableProjects: actions.hideDisableProjects,
      maximizeSidebar: actions.maximizeSidebar
    })
  )(ProjectList)
)
