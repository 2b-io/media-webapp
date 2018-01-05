import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import IconRefresh from 'react-icons/lib/md/refresh'

import style from './style'

@connect()
@Radium
class BillingWidget extends React.Component {
  render() {
    return (
      <div style={style.wrapper}>
        <div style={style.header}>
          <div style={style.title}>Billing</div>
          <div style={style.controls}>
            <div style={style.button}>
              <IconRefresh size={16} />
            </div>
          </div>
        </div>
        <div style={style.content}>
          {this._renderBilling()}
        </div>
      </div>
    )
  }

  _renderBilling() {
    return (
      <p>This feature will be available soon.</p>
    )
  }
}

export default BillingWidget
