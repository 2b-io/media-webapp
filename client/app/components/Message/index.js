import Radium from 'radium'
import React from 'react'

import IconClose from 'react-icons/lib/md/close'

import style from './style'

@Radium
class Message extends React.PureComponent {
  render() {
    const { children, type, onDismiss } = this.props

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
        </div>
      </div>
    )
  }
}

export default Message
