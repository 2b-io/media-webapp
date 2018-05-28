import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'

@connect(
  state => ({
    current: selectors.currentLocation(state)
  }),
  dispatch => ({
    init: pathname => dispatch(actions.initLocation(pathname)),
    request: pathname => dispatch(actions.requestLocation(pathname))
  })
)
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
    const { init, request } = this.props

    this.browserHistory.listen((location, type) => {
      if (this.ignoreChange) {
        this.ignoreChange = false

        return
      }

      request(location.pathname)
    })

    init(this.browserHistory.location.pathname)
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

  shouldComponentUpdate() {
    return false
  }
}
