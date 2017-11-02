import createHistory from 'history/createBrowserHistory'
import React from 'react'
import { connect } from 'react-redux'

import trace from 'helpers/trace'

import { informHistoryPopManually } from 'core/actions'

@connect(state => state.history)
class History extends React.Component {
  constructor(props) {
    super(props)

    this.history = createHistory()

    this.history.listen(this.__handleHistoryChange.bind(this))
  }

  componentWillMount() {
    let { dispatch } = this.props

    dispatch(informHistoryPopManually(location.pathname))
  }

  componentWillReceiveProps(nextProps) {
    if (this.history.location.pathname === nextProps.pathname) {
      return
    }

    this.history.push(nextProps.pathname)
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    let { children } = this.props

    return React.cloneElement(children, {
      history: this.history
    })
  }

  @trace()
  __handleHistoryChange(location, action) {
    if (action === 'POP') {
      let { dispatch } = this.props

      dispatch(informHistoryPopManually(location.pathname))
    }
  }
}

export default History
