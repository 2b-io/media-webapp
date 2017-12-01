import createHistory from 'history/createBrowserHistory'
import React from 'react'
import { connect } from 'react-redux'
import { Router as BrowserRouter } from 'react-router'

import { informHistoryPopManually } from 'actions/location'

@connect(state => ({ location: state.location }))
class Router extends React.Component {
  constructor(props) {
    super(props)

    this.history = createHistory()

    this.history.listen(
      this._handleHistoryChange.bind(this)
    )
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { location } = this.history

    dispatch(informHistoryPopManually(location.pathname))
  }

  componentWillReceiveProps(nextProps) {
    const { location:next } = nextProps

    if (next.type === 'push') {
      this.history.push(next.pathname)
    } else if (next.type === 'replace') {
      this.history.replace(next.pathname)
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { component: Component } = this.props

    return (
      <BrowserRouter history={this.history}>
        <Component { ...this.props } />
      </BrowserRouter>
    )
  }

  _handleHistoryChange(location, action) {
    if (action === 'POP') {
      const { dispatch } = this.props

      dispatch(informHistoryPopManually(location.pathname))
    }
  }
}

export default Router
