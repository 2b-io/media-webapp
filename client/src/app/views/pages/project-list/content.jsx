import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ButtonCircle } from 'ui/elements'
import { mapState } from 'services/redux-helpers'
import { GridView, Modal } from 'ui/compounds'
import { PlusIcon } from 'ui/icons'
import  CreateProject from '../create-project'
import { selectors } from 'state/interface'

class ProjectList extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      openModal: false
    }
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
          size='large'
        >
          <PlusIcon large inverted />
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
