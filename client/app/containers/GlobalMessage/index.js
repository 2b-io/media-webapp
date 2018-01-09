import React from 'react'
import { connect } from 'react-redux'

import { dismiss } from 'actions/message'
import { redirect } from 'actions/routing'
import Message from 'components/Message'

@connect(state => ({ messages: state.ui.message }))
class GlobalMessage extends React.Component {
  render() {
    const { messages } = this.props

    return Object.keys(messages).map(key => this._renderMessage(key, messages[key]))
  }

  _renderMessage(key, message) {
    if (!message) return null

    return (
      <Message key={key}
        type={message.type}
        onClick={this._redirect(key, message.link)}
        onDismiss={this._dismiss(key)}>
        {message.value}
      </Message>
    )
  }

  _dismiss(key) {
    const { dispatch } = this.props

    return () => dispatch(dismiss(key))
  }

  _redirect(key, link) {
    if (!link) return null

    const { dispatch } = this.props

    return () => dispatch(redirect(link))
  }
}

export default GlobalMessage
