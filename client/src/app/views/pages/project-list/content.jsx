import React from 'react'
import { connect } from 'react-redux'

import { mapState } from 'services/redux-helpers'
import { selectors } from 'state/interface'
import { GridView } from 'ui/compounds'

const ProjectList = ({ projects }) => {
  if (!projects || !projects.length) {
    return (
      <h2>No data ....</h2>
    )
  }

  return (
    <main>
      <GridView
        dataHeader={ [ 'ID', 'Name', 'Slug', 'Disabled' ] }
        dataBody={ projects }
      />
    </main>
  )
}

export default connect(
  mapState({
    projects: selectors.allProjects,
  })
)(ProjectList)

// TODO
//   <List
//     items={ projects }
//     renderItem={ project => <Project data={ project } /> }
//   />
// )
