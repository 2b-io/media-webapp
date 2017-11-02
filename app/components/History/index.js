import createHistory from 'history/createBrowserHistory'
import React from 'react'
import { connect } from 'react-redux'

@connect(state => state.history)
class History extends React.Component {
  constructor(props) {
    super(props)

    this.history = createHistory()
  }

  componentWillMount() {
    this.__dispatchHistoryChange()
  }

  componentWillReceiveProps(nextProps) {
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

  __dispatchHistoryChange() {
    let { dispatch } = this.props
    let { pathname } = this.history.location

    dispatch({
      type: 'HISTORY_CHANGED',
      pathname
    })
  }
}

export default History
