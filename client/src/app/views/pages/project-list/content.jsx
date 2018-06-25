import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ButtonCircle, Button } from 'ui/elements'
import { mapState } from 'services/redux-helpers'
import { GridView, Modal } from 'ui/compounds'
import { PlusIcon } from 'ui/icons'
import  ProjectForm from './projectForm'
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
        dataHeader={ [ 'ID', 'Name', 'Slug' ] }
        dataBody={ projects }
      />
    )
  }

  render() {
    console.log("openModal",this.state.openModal);
    return (
      <main>
        { this.displayProjects() }
        <ButtonCircle
          onClick={(e)=>{console.log('eeee'); this.setState({openModal:true})}}
          size='large'
        >
          <PlusIcon large inverted />
       </ButtonCircle>
       <Button onClick={(e)=>{console.log('eeee'); this.setState({openModal:true})}}>
         aaaa
       </Button>
         <Modal open={this.state.openModal}>
          <ProjectForm/>
        </Modal>
     </main>
    )
  }
}

export default connect(
  mapState({
    projects: selectors.allProjects
  })
)(ProjectList)
