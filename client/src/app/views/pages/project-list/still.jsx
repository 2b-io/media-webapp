import React, { Fragment } from 'react'

import { FilterIcon } from 'ui/icons'
import { ContextMenu, List } from 'ui/elements'
import { PageTitle, TextLine } from 'ui/typo'

const ProjectList = () => (
  <Fragment>
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

export default ProjectList
