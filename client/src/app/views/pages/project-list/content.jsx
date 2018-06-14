import React, {Component} from 'react'
import {mapDispatch} from 'services/redux-helpers'
import {connect} from 'react-redux'
import {actions} from 'state/interface'
import {GridView} from 'ui/compounds'

class ProjectList extends React.Component {
  componentDidMount() {
      // to do
    this.props.getListProject()
  }

  displayProjects() {
    let {projects} = this.props
    if (projects && projects.length) {
      return (
        <GridView
          dataHeader={['ID', 'Name', 'Slug']}
          dataBody={projects}
        />
      )
    } else {
      return <h2>No data ....</h2>
    }
  }

  render() {
    return (
      <main>
        {this.displayProjects()}
      </main>
    )
  }
}

const mapStateToProps = ({ project }) => {
  return {projects: project.projects}
}

const mapDispatchToProps = mapDispatch({
  getListProject: () => actions.getListProject()
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)
