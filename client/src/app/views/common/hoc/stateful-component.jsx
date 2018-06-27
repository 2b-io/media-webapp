import React, { Component } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'

export default ({ component }) => WrappedComponent => {

  class StatefulComponent extends Component {
    componentWillUnmount() {
      this.props.clearState()
    }

    render() {
      return <WrappedComponent { ...this.props } />
    }
  }

  return connect(
    state => ({
      ui: state.ui[component]
    }),
    mapDispatch({
      clearState: () => ({
        type: '@@UI/CLEAR',
        payload: { component }
      })
    })
  )(StatefulComponent)
}
