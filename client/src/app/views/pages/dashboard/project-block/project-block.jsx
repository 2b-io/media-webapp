import React from 'react'

import { Card, List, PlainButton, StatusIndicator } from 'ui/elements'
import { AddIcon } from 'ui/icons'
import { Heading, Text, TextLine } from 'ui/typo'

const ProjectBlock = ({
  pinnedProjects,
  toCreateProject,
  toProjectDetail
}) => {
  const items = pinnedProjects.map(
    project => ({
      key: project._id,
      leading: () => <StatusIndicator isActive={ project.isActive } />,
      content: () => <TextLine mostRight>{ project.name }</TextLine>,
      onClick: toProjectDetail.bind(null, project.identifier)
    })
  )

  return (
    <Card
      title={ () => <Heading mostLeft mostRight>Projects</Heading> }
      fab={ () => (
        <PlainButton onClick={ toCreateProject }>
          <AddIcon />
        </PlainButton>
      ) }
      content={ () => (
        items.length &&
          <List items={ items } interactable={ true } /> ||
          <Text mostLeft mostRight>
            You do not have any projects yet.
          </Text>
      ) }
    />
  )
}

export default ProjectBlock
