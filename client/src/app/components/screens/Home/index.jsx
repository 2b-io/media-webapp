import Radium from 'radium'
import React, { Component } from 'react'

import { style } from './style'

@Radium
export default class HomeScreen extends Component {
  render() {
    return (
      <div style={style}>
        <h1>Home</h1>
      </div>
    )
  }
}
