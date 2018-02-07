import React from 'react'
import { Portal } from 'react-portal'
import { connect } from 'react-redux'
import ScrollLock from 'react-scrolllock'
import { modalLayout } from 'styles/layout'

const INVISIBLE = {
  display: 'none'
}

export default id => {
  return Component => {

    @connect(state => ({
      isOpenned: !!state.ui.modal[id],
      modalData: state.ui.modal[id]
    }))
    class Modal extends React.Component {
      render() {
        const { isOpenned } = this.props

        return (
          <Portal>
            <div style={isOpenned ? modalLayout.portal : INVISIBLE}
              ref={ e => this._container = e }>
              { isOpenned ? [
                <Component key="modal" {...this.props} />,
                <ScrollLock key="scrolllock" touchScrollTarget={this._container} />
              ] : null }
            </div>
          </Portal>
        )
      }
    }

    return Modal
  }
}
