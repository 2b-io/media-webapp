import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'

class HistoryManager extends Component {
  constructor(...args) {
    super(...args)

    this.browserHistory = createBrowserHistory({
      initialEntries: [ '/' ]
    })

    this.memoryHistory = createMemoryHistory({
      initialEntries: [ '/splash' ]
    })
  }

  componentDidMount() {
    const { init, request, updateKey } = this.props

    this.browserHistory.listen(location => {
      if (this.ignoreChange) {
        this.ignoreChange = false

        return
      }

      const { pathname, search } = location

      request(`${ pathname }${ search }`)
      updateKey(location.key)
    })

    this.memoryHistory.listen(location => {
      updateKey(location.key)
    })

    const { pathname, search } = this.browserHistory.location

    init(`${ pathname }${ search }`)
  }

  componentDidUpdate() {
    const { current } = this.props

    if (current.pathname && current.key !== this.memoryHistory.location.key) {
      this.memoryHistory.push(current.pathname)

      if (current.pathname !== this.browserHistory.location.pathname) {
        this.ignoreChange = true

        this.browserHistory.push(current.pathname)
      }
    }
  }

  render() {
    const { children } = this.props

    return React.cloneElement(children, {
      history: this.memoryHistory,
      locationKey: this.memoryHistory.location.key
    })
  }
}

export default connect(
  mapState({
    current: selectors.currentLocation
  }),
  mapDispatch({
    init: actions.initLocation,
    request: actions.requestLocation,
    updateKey: actions.updateLocationKey
  })
)(HistoryManager)
