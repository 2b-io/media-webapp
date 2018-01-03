import React from 'react'
import { connect } from 'react-redux'

import { clearState } from 'actions/ui-state'

export default function(id, mapStateToProps = state => null) {

  return function(Component) {

    @connect(state => ({
      [`UI/${id}`]: state.ui[id],
      ...mapStateToProps(state)
    }))
    class UIState extends React.Component {
      componentDidMount() {
        const { dispatch } = this.props

        dispatch(clearState(id))
      }

      componentWillUnmount() {
        const { dispatch } = this.props

        dispatch(clearState(id))
      }

      render() {
        return <Component {...this.props} {...this.state} account={{}} />
      }
    }

    return UIState
  }
}
