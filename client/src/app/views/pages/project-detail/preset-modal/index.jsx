import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'
import { Container, ErrorBox } from 'ui/elements'
import { modal } from 'views/common/decorators'
import { Redirect, withParams } from 'views/router'

import _PresetForm from './form'

const PresetForm = reduxForm({
  form: 'preset',
  enableReinitialize: true
})(_PresetForm)

const PresetModal = ({
  deletePreset,
  preset,
  savePreset,
  slug,
  ui: {
    idle,
    createError, createResult,
    deleteError, deleteResult,
    updateError
  }
}) => {
  return (
    <Container>
      { createError &&
        <ErrorBox>An error happens when creating the new preset.</ErrorBox>
      }
      { updateError &&
        <ErrorBox>An error happens when updating the preset.</ErrorBox>
      }
      { deleteError &&
        <ErrorBox>An error happens when deleting the preset.</ErrorBox>
      }
      { createResult &&
        <Redirect to={ `/projects/${ slug }/presets/${ createResult.hash }` } />
      }
      { deleteResult &&
        <Redirect to={ `/projects/${ slug }` } />
      }
      <PresetForm
        idle={ idle }
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
    name: 'Preset'
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
    )(PresetModal)
  )
)
