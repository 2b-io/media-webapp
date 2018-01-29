import React from 'react'
import { Portal } from 'react-portal'
import { connect } from 'react-redux'

export default id => {
  return Component => {

    @connect(state => ({
      isOpenned: !!state.ui.modal[id],
      data: state.ui.modal[id]
    }))
    class Modal extends React.Component {
      render() {
        const { isOpenned, data } = this.props

        if (!isOpenned) {
          return null
        }

        return (
          <Portal>
            <Component {...this.props} data={data} />
          </Portal>
        )
      }
    }

    return Modal
  }
}
