import createHistory from 'history/createBrowserHistory'
import React from 'react'
import { connect } from 'react-redux'

import trace from 'helpers/trace'

@connect(state => state.history)
class History extends React.Component {
  constructor(props) {
    super(props)

    this.history = createHistory()

    this.history.listen(this.__dispatchHistoryChange.bind(this, true))
  }

  componentWillMount() {
    this.__dispatchHistoryChange()
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
  __dispatchHistoryChange(manual = false) {
    let { dispatch } = this.props
    let { pathname } = this.history.location

    console.log('__dispatchHistoryChange', manual)

    dispatch({
      type: 'HISTORY_CHANGED',
      pathname
    })
  }
}

export default History
