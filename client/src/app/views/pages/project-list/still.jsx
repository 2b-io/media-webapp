import React, { Component } from 'react'

import { ButtonCircle } from 'ui/elements'
import { AddIcon } from 'ui/icons'
import { Modal } from 'ui/compounds'

import CreateProject from 'views/common/modals/create-project'

class ListProject extends Component {

  state = {
    openModal: false
  }

  render(){
    return (
      <div>
        <span>Projects</span>
        <ButtonCircle
          onMouseDown={ () => this.setState({ openModal: true }) }
          size="large"
          float='right'
          margin='-10px 0 0 0'
          color='#00D9C5'
        >
          <AddIcon large inverted />
        </ButtonCircle>
        <Modal
          open={ this.state.openModal }
          onClickOutside={ () => { this.setState({ openModal: false }) } }
          onClose={ () => { this.setState({ openModal: false }) } }
          position='top'
        >
          <CreateProject />
        </Modal>
      </div>
    )
  }
}

export default ListProject
