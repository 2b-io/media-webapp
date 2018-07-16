import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'
import { modal } from 'views/common/decorators'
import { withParams } from 'views/router'

import _PresetForm from './form'

const PresetForm = reduxForm({
  form: 'preset',
  enableReinitialize: true
})(_PresetForm)

const CreatePreset = ({
  deletePreset,
  preset,
  savePreset,
  slug
}) => {
  return (
    <Container>
      <PresetForm
        onSubmit={ preset => savePreset({ preset, slug }) }
        initialValues={ preset }
        isDefault={ !!preset.isDefault }
        isEditing={ !!preset.hash }
        onDelete={ () => deletePreset({ preset, slug }) }
      />
    </Container>
  )
}

export default withParams(
  modal({
    name: 'CreatePreset'
  })(
  // withParams(
    connect(
      (state, { params: { slug, hash } }) => {
        return {
          preset: selectors.findPreset(state, { hash, slug }) || {},
          slug
        }
      },
      dispatch => ({
        savePreset: ({ preset, slug }) => preset.hash ?
          dispatch(actions.updatePreset({ preset, slug })) :
          dispatch(actions.createPreset({ preset, slug })),
        deletePreset: ({ preset, slug }) => dispatch(actions.deletePreset({ preset, slug }))
      })
    )(CreatePreset)
  // )
  )
)
