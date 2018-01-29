import React from 'react'
import { connect } from 'react-redux'

import { dismiss } from 'actions/message'
import { redirect } from 'actions/routing'
import { InternalLink } from 'components/Link'
import Message from 'components/Message'

import style from './style'

@connect(state => ({ messages: state.ui.message }))
class GlobalMessage extends React.Component {
  render() {
    const { messages } = this.props

    return (
      <div style={style.wrapper}>
        <div style={style.content}>
          {Object.keys(messages).map(
            key => this._renderMessage(key, messages[key])
          )}
        </div>
      </div>
    )
  }

  _renderMessage(key, message) {
    if (!message) return null

    return (
      <Message key={key}
        type={message.type}
        duration={message.duration}
        onDismiss={this._dismiss(key)}>
        { message.link ?
          <InternalLink link={message.link}>{message.value}</InternalLink> :
          <span>{message.value}</span>
        }
      </Message>
    )
  }

  _dismiss(key) {
    const { dispatch } = this.props

    return () => dispatch(dismiss(key))
  }
}

export default GlobalMessage
