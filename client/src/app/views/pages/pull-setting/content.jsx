import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'
import { stateful } from 'views/common/decorators'

import _PullSettingForm from './form'

const PullSettingForm = reduxForm({
  form: 'pullSetting',
  enableReinitialize: true
})(_PullSettingForm)

const PullSetting = ({
  pullSetting,
  identifier,
  updatePullSetting
}) => {
  return (
    <Container>
      <PullSettingForm
        initialValues={ pullSetting }
        onSubmit={ (pullSetting) => updatePullSetting({ identifier, pullSetting }) }
      />
    </Container>
  )
}
export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    return {
      pullSetting: selectors.pullSetting(state, identifier),
      identifier
    }
  },
  mapDispatch({
    updatePullSetting: actions.updatePullSetting
  })
)(PullSetting)
