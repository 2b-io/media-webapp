import React, { Component } from 'react'
import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { GridView, Modal } from 'ui/compounds'

class ProjectList extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      open: false
    }
  }

  displayProjects() {
    const { projects } = this.props

    if (!projects || !projects.length) {
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
    return (
      <main>
        { this.displayProjects() }
        <Modal
          open={ this.state.open }
          onClickOutside={ () => this.setState({ open: false }) }
          onClose={ () => this.setState({ open: false }) }>
          { ({ open }) => {
            const content = open ? (
              <div>
                <p>
                  Test new modal
                </p>
                <button>New modal</button>
                { this.displayProjects() }
              </div>
            ) : <i />

            return content
          } }
        </Modal>
        <button onClick={ () => this.setState({ open: true }) }>Open Modal</button>
      </main>
    )
  }
}

export default connect(
  mapState({
    projects: selectors.allProjects
  }),
  mapDispatch({
    fetchProjects: () => actions.fetchProjects()
  })
)(ProjectList)
