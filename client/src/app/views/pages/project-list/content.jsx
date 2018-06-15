import React, { Component } from 'react'
import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { GridView } from 'ui/compounds'
import {Modal} from 'ui/elements'
class ProjectList extends Component {
  componentDidMount() {
      // TODO request data from saga
    this.props.fetchProjects()
  }
  state = {
    open:false
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
        {this.displayProjects()}
        <Modal
          open={this.state.open}
          onClickOutside={(e)=>{
           this.setState({open:false})
        }}
          onClose={(e)=>{
           this.setState({open:false})
        }}
        >
          {({open}) => {
            const content =  open ? <div>
            <p>
              Test new modal
            </p>
            <button> New modal </button>
            {this.displayProjects()}
          </div> : ''
          return content
        }}
        </Modal>
        <button onClick={()=> { this.setState({open:true})} }>Open Modal</button>
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
