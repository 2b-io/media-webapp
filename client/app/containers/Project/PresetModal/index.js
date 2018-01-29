import Radium from 'radium'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import Button from 'components/Button'
import ResponsiveBox from 'components/ResponsiveBox'
import TextBox from 'components/inputs/TextBox'
import modal from 'decorators/Modal'

import style from './style'

@reduxForm({ form: 'preset', enableReinitialize: true })
class PresetForm extends React.Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <div style={style.form}>
        <form onSubmit={handleSubmit}>
          <div style={style.row}>
            <label style={style.label}>Hash</label>
            <Field component={TextBox}
              name="hash"
              readOnly={true}
            />
            <p style={style.desc}>Hash will be generated after creating the preset.</p>
          </div>
          <div style={style.row}>
            <label style={style.label}>Name</label>
            <Field component={TextBox}
              name="name"
              placeholder="Resize"
            />
          </div>
          <div style={style.row}>
            <label style={style.label}>Quality</label>
            <Field component={TextBox}
              name="values.quality"
              placeholder="Resize"
            />
            <p style={style.desc}>Adjusts the jpeg|miff|png|tiff compression level. Value ranges from 0 to 100 (best).</p>
          </div>
          <div style={style.row}>
            <label style={style.label}>Step</label>
            <Field component={TextBox}
              name="values.step"
              placeholder="Resize"
            />
            <p style={style.desc}>Adjusts the jpeg|miff|png|tiff compression level. Value ranges from 0 to 100 (best).</p>
          </div>
        </form>
      </div>
    )
  }
}

@modal('preset')
class PresetModal extends React.Component {
  render() {
    const { onOverlayClick, modalData:preset } = this.props

    console.log(preset)

    return [
      <div key="overlay"
        style={style.overlay} onClick={onOverlayClick}>
      </div>,
      <div key="modal" style={style.wrapper}>
        <div style={style.content}>
          <PresetForm
            initialValues={preset}
          />
          <ResponsiveBox style={style.control}>
            <Button style={style.confirmButton}
              onClick={this._chooseAction('confirm')}>save</Button>
            <span style={style.cancelButton}
              onClick={this._chooseAction('cancel')}>cancel & close</span>
          </ResponsiveBox>
        </div>
      </div>
    ]
  }

  _chooseAction(action) {
    const { onAction } = this.props

    return () => {
      if (!onAction) {
        return
      }

      onAction(action)
    }
  }
}

export default PresetModal
