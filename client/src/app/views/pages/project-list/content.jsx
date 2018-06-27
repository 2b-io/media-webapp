import React, { Component } from 'react'
import { connect } from 'react-redux'

import { mapState } from 'services/redux-helpers'
import { selectors } from 'state/interface'
import { GridView, Modal } from 'ui/compounds'
import { ButtonCircle } from 'ui/elements'
import { AddIcon } from 'ui/icons'

import CreateProject from 'views/common/modals/create-project'

// import Project from './project'

class ProjectList extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      openModal: false
    }
  }

  renderProjectList(projects) {
    // return (
    //   <List
    //     items={ projects }
    //     renderItem={ project => <Project data={ project } /> }
    //   />
    // )

    // return (
    //   <List>
    //     {
    //       projects.map(project => (
    //         <ListItem key={ project._id }>
    //           <Project data={ project } />
    //         </ListItem>
    //       ))
    //     }
    //   </List>
    // )
  }

  displayProjects() {
    const { projects } = this.props
    if (!projects || !projects.length) {
      return <h2>No data ....</h2>
    }
    return (
      <GridView
        dataHeader={ [ 'ID', 'Name', 'Slug', 'Disabled' ] }
        dataBody={ projects }
      />
    )
  }

  render() {
    return (
      <main>
        <ButtonCircle
          onMouseDown={ () => this.setState({ openModal: true }) }
          size="large"
        >
          <AddIcon large inverted />
        </ButtonCircle>
        { this.displayProjects() }
        <Modal
          open={ this.state.openModal }
          onClickOutside={ () => { this.setState({ openModal: false }) } }
          onClose={ () => { this.setState({ openModal: false }) } }
        >
          <CreateProject />
        </Modal>
      </main>
    )
  }
}

export default connect(
  mapState({
    projects: selectors.allProjects,
  })
)(ProjectList)
