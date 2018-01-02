import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import { InternalLink } from 'components/Link'
import Layout, { SYSTEM_MODE } from 'decorators/Layout'

import style from './style'

@connect()
@Layout(SYSTEM_MODE)
@Radium
class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section style={style.wrapper}>
        <div style={style.about}>
          <div style={style.homeHead}>
            <div id="logo" style={style.homeHeadAnimation}></div>
          </div>
          <h1 style={style.heading}>A blogging platform designed to help you think</h1>
          <InternalLink link="/sign-up" style={style.signUp}>sign up</InternalLink>
          <p style={style.description}><strong>MediaOnDemand</strong> is a writing and reading network designed from the ground up to work the same way your brain does. It helps you curate ideas and includes everything you need to develop and publish your thoughts to the world.</p>
        </div>
        <div style={style.features}>
          <ul style={style.featuresList}>
            <li>

            </li>
            <li>
              <InternalLink link="/about">And lots more →</InternalLink>
            </li>
          </ul>
        </div>
      </section>
    )
  }
}

export default HomePage
