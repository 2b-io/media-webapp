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
    request: pathname => dispatch(actions.requestLocation(pathname)),
    updateKey: key => dispatch(actions.updateLocationKey(key))
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
    const { init, request, updateKey } = this.props

    this.browserHistory.listen(location => {
      if (this.ignoreChange) {
        this.ignoreChange = false

        return
      }

      request(location.pathname)
      updateKey(location.key)
    })

    this.memoryHistory.listen(location => {
      updateKey(location.key)
    })

    init(this.browserHistory.location.pathname)
  }

  componentWillReceiveProps(nextProps) {
    const { current } = nextProps

    if (current.key !== this.memoryHistory.location.key) {
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
      history: this.memoryHistory
    })
  }
}
