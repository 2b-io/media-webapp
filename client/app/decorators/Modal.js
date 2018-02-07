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
        console.log('render', id)

        const { isOpenned } = this.props

        const style = {
          ...modalLayout.portal,
          display: isOpenned ? 'block' : 'none'
        }

        return (
          <Portal>
            <div style={style}
              ref={ e => {
                this._container = e
              } }>
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
