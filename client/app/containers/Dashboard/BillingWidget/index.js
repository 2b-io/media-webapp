import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import style from './style'

@connect()
@Radium
class BillingWidget extends React.Component {
  render() {
    return (
      <div style={style.wrapper}>
        <h2>Billing</h2>
      </div>
    )
  }
}

export default BillingWidget
