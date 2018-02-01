import React from 'react'
import { Portal } from 'react-portal'
import { connect } from 'react-redux'
import ScrollLock from 'react-scrolllock'
import { modalLayout } from 'styles/layout'

export default id => {
  return Component => {

    @connect(state => ({
      isOpenned: !!state.ui.modal[id],
      modalData: state.ui.modal[id]
    }))
    class Modal extends React.Component {
      render() {
        const { isOpenned } = this.props

        if (!isOpenned) {
          return null
        }

        return (
          <Portal>
            <div style={modalLayout.portal}>
              <Component {...this.props} />
              <ScrollLock />
            </div>
          </Portal>
        )
      }
    }

    return Modal
  }
}
