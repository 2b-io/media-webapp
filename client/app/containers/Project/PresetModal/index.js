import Radium from 'radium'
import React from 'react'

import Button from 'components/Button'
import ResponsiveBox from 'components/ResponsiveBox'
import modal from 'decorators/Modal'

import style from './style'

@modal('preset')
class PresetModal extends React.Component {
  render() {
    const { onOverlayClick } = this.props

    return [
      <div key="overlay"
        style={style.overlay} onClick={onOverlayClick}>
      </div>,
      <div key="modal" style={style.wrapper}>
        <div style={style.content}>
          <ResponsiveBox style={style.control}>
            <Button style={style.confirmButton}
              onClick={this._chooseAction('confirm')}>Save</Button>
            <span style={style.cancelButton}
              onClick={this._chooseAction('cancel')}>I've changed my mind</span>
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
