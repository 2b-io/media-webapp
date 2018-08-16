import Radium from 'radium'
import React from 'react'

import IconClose from 'react-icons/lib/md/close'

import style from './style'

@Radium
class Message extends React.PureComponent {
  render() {
    const { children, type, onDismiss, duration } = this.props

    const appliedStyle = style[type]

    return (
      <div style={appliedStyle.wrapper}>
        <div style={appliedStyle.content}>
          <p style={appliedStyle.message}>
            {children}
          </p>
          <div style={appliedStyle.icon} onClick={onDismiss}>
            <IconClose size={16} />
          </div>
          {this._renderAutoDismiss(appliedStyle, duration)}
        </div>
      </div>
    )
  }

  _renderAutoDismiss(style, duration) {
    const { autoDismiss } = style

    if (!duration) return null

    autoDismiss.animation = `toast ${duration / 1000}s linear`

    return <div style={autoDismiss} />
  }
}

export default Message
