import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'

import { ROUTING } from 'actions/routing'

export default (path, exact = true) => {
  return Component => {

    @connect(state => {
      if (!state.routing.location) {
        return {}
      }

      const url = state.routing.location.pathname

      return {
        reduxMatch: state.routing.matches[url]
      }
    })
    class Wrapper extends React.Component {
      componentDidMount() {
        const { dispatch, match } = this.props

        dispatch({
          type: ROUTING.MATCH,
          payload: {
            path: match.url,
            match
          }
        })
      }

      componentWillUnmount() {
        const { dispatch, match } = this.props

        dispatch({
          type: ROUTING.MATCH,
          payload: {
            path: match.url
          }
        })
      }

      render() {
        const { reduxMatch } = this.props

        return reduxMatch ? <Component {...this.props} /> : null
      }
    }

    class ReduxRoute extends React.Component {
      render() {
        const props = {
          exact: exact,
          path: path,
          render: props => <Wrapper {...props} />
        }

        return <Route {...props} />
      }
    }

    return ReduxRoute
  }
}
