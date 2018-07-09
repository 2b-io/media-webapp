import React from 'react'
import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Link } from 'ui/elements'

const Project = ({ project, toProjectDetail }) => (
  <div>
    <Link href="/" onClick={ toProjectDetail }>{ project.name }</Link>
  </div>
)

const ProjectList = ({ projects, toProjectDetail }) => {
  if (!projects || !projects.length) {
    return (
      <h2>No data ....</h2>
    )
  }

  return (
    <main>
      {
        projects.map(
          project => (
            <Project key={ project._id }
              project={ project }
              toProjectDetail={ toProjectDetail.bind(null, project.slug) }
            />
          )
        )
      }
    </main>
  )
}

export default connect(
  mapState({
    projects: selectors.allProjects,
  }),
  mapDispatch({
    toProjectDetail: slug => actions.requestLocation(`/projects/${ slug }`)
  })
)(ProjectList)

// TODO
//   <List
//     items={ projects }
//     renderItem={ project => <Project data={ project } /> }
//   />
// )
