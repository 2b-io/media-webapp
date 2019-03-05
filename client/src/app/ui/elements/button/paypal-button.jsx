import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import paypal from 'paypal-rest-sdk'

class PaypalButton extends Component {
  componentDidMount() {
    console.log(paypal)
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default PaypalButton
