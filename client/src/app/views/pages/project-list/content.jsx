import React, { Component } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { GridView } from 'ui/compounds'

class ProjectList extends Component {
  componentDidMount() {
      // TODO request data from saga
    this.props.fetchProjects()
  }

  renderProjects(projects) {
    if (!projects || projects.length === 0) {
      return <h2>No data ....</h2>
    }

    return (
      <GridView
        dataHeader={ [ 'ID', 'Name', 'Slug' ] }
        dataBody={ projects }
      />
    )
  }

  render() {
    const { projects } = this.props

    return (
      <main>
        { this.renderProjects(projects) }
      </main>
    )
  }
}

export default connect(
  state => ({
    projects: selectors.allProjects(state)
  }),
  mapDispatch({
    fetchProjects: () => actions.fetchProjects()
  })
)(ProjectList)
