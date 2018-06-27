import React, { Fragment } from 'react'
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
  <Fragment>
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
    </div>
    <CreateProjectModal width="wide" />
  </Fragment>
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
