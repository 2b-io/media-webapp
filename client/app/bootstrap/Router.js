import createHistory from 'history/createBrowserHistory'
import nprogress from 'nprogress'
import React from 'react'
import { connect } from 'react-redux'
import { Router as BrowserRouter } from 'react-router'

import { informHistoryPopManually } from 'actions/location'

console.log(nprogress)

@connect(state => ({ location: state.ui.location }))
class Router extends React.Component {
  constructor(props) {
    super(props)

    this.history = createHistory()

    this.history.listen(
      this._handleHistoryChange.bind(this)
    )
  }

  componentDidMount() {
    const { location } = this.history

    this._handleForceChange(location)
  }

  componentWillReceiveProps(nextProps) {
    const { location:next } = nextProps

    if (next.type !== 'pop') {
      nprogress.start()
    }

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
      this._handleForceChange(location)
    }

    nprogress.done()
  }

  _handleForceChange(location) {
    console.info('z')
    const { dispatch } = this.props

    dispatch(informHistoryPopManually(location.pathname))

    nprogress.start()
    setTimeout(() => nprogress.done(), 200)
  }
}

export default Router
