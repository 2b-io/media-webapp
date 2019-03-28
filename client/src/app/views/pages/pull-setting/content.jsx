import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container, LoadingIcon } from 'ui/elements'

import StatelessPullSettingForm from './form'

const PullSettingForm = reduxForm({
  form: 'pullSetting',
  enableReinitialize: true
})(StatelessPullSettingForm)

const PullSetting = ({
  pullSetting,
  identifier,
  updatePullSetting,
  ui: {
    idle
  }
}) => {
  return (
    <Container>
      {
        !idle && <LoadingIcon />
      }
      <PullSettingForm
        idle={ idle }
        initialValues={ pullSetting }
        onSubmit={ (pullSetting) => updatePullSetting({ identifier, pullSetting }) }
      />
    </Container>
  )
}

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    if (!identifier) {
      return {}
    }

    return {
      pullSetting: selectors.pullSetting(state, identifier),
      identifier
    }
  },
  mapDispatch({
    updatePullSetting: actions.updatePullSetting
  })
)(PullSetting)
