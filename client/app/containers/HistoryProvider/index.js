import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import React from 'react'
import { connect } from 'react-redux'

import { accept, redirect, sync } from 'actions/routing'

@connect(state => ({
  acceptLocation: state.routing.location,
  requestLocation: state.routing.request
}))
class HistoryProvider extends React.Component {
  constructor(props) {
    super(props)

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
      if (this.ignoreEvent) {
        this.ignoreEvent = false
        return
      }

      dispatch(redirect(location.pathname))
    })

    dispatch(redirect(this.browserHistory.location.pathname))
  }

  componentWillReceiveProps(nextProps) {
    const { acceptLocation, requestLocation } = nextProps
    const { dispatch } = this.props

    if (acceptLocation && acceptLocation !== this.lastLocation) {
      this.lastLocation = acceptLocation
      this.ignoreEvent = true
      this.browserHistory.push(acceptLocation.pathname, acceptLocation.key)
      this.memoryHistory.push(acceptLocation.pathname, acceptLocation.key)
    }

    if (requestLocation) {
      dispatch(accept(requestLocation))
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { children } = this.props

    return React.cloneElement(children, {
      history: this.browserHistory
    })
  }
}

export default HistoryProvider
