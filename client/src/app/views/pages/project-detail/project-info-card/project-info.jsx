import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Heading } from 'ui/typo'
import { Card, Nothing } from 'ui/elements'
import { EditIcon } from 'ui/icons'
import { Project } from 'views/common/compounds'

const ProjectInfoCard = ({
  identifier,
  project,
  toEditProject
}) => (
  project && (
    <Card
      title={ () => <Heading mostLeft mostRight>General</Heading> }
      fab={ () => <EditIcon onClick={ () => toEditProject(identifier) } /> }
      content={ () => <Project project={ project } /> }
    />
  ) || <Nothing />
)

export default connect(
  (state, { identifier }) => ({
    project: selectors.findProjectByIdentifier(state, identifier)
  }),
  mapDispatch({
    toEditProject: (identifier) => actions.requestLocation(`/projects/${ identifier }/edit`)
  })
)(ProjectInfoCard)
