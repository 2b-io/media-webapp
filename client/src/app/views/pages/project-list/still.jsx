import React, { Fragment } from 'react'

import { List, MenuMore } from 'ui/elements'
import { PageTitle, TextLine } from 'ui/typo'

const ProjectList = () => (
  <Fragment>
    <PageTitle>Projects</PageTitle>
    <MenuMore
      initialValues={ { isOpen: false } }
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
