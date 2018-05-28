import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'

@connect(state => ({
  current: selectors.currentLocation(state)
}))
export default class HistoryManager extends Component {
  constructor(...args) {
    super(...args)

    this.browserHistory = createBrowserHistory({
      initialEntries: ['/']
    })

    this.memoryHistory = createMemoryHistory({
      initialEntries: ['/splash']
    })
  }

  componentDidMount() {
    const { dispatch } = this.props

    this.browserHistory.listen((location, type) => {
      if (this.ignoreChange) {
        this.ignoreChange = false

        return
      }

      dispatch(actions.requestLocation(location.pathname))
    })

    window.h = this.browserHistory

    dispatch(actions.initLocation(this.browserHistory.location.pathname))
  }

  componentWillReceiveProps(nextProps) {
    const { current } = nextProps

    if (current) {
      this.memoryHistory.push(current)

      if (current !== this.browserHistory.location.pathname) {
        this.ignoreChange = true

        this.browserHistory.push(current)
      }
    }
  }

  render() {
    const { children } = this.props

    return React.cloneElement(children, {
      history: this.memoryHistory
    })
  }
}
