import React from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { ButtonCircle } from 'ui/elements'
import { AddIcon } from 'ui/icons'
import { modal } from 'views/common/hoc'
import CreateProject from 'views/common/modals/create-project'

const CreateProjectModal = modal({
  name: 'CreateProject'
})(CreateProject)

const ProjectList = ({ showModal }) => (
  <div>
    <span>Projects</span>
    <ButtonCircle
      onClick={ showModal }
      size="large"
      float='right'
      margin='-10px 0 0 0'
      color='#00D9C5'
    >
      <AddIcon large inverted />
    </ButtonCircle>
    <CreateProjectModal
      hideOnClickOutside={ true }
      showCloseButton={ true }
      width="wide"
    />
  </div>
)

export default connect(
  null,
  mapDispatch({
    showModal: () => ({
      type: '@@MODAL/SHOW',
      payload: { modal: 'CreateProject' }
    })
  })
)(ProjectList)
