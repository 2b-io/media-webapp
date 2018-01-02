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
            <li style={style.feature}>
              <span style={style.featureName}>An innovative dashboard</span>
              <p style={style.featureDesc}>The Dashboard on MediaOnDemand is designed to help you curate ideas, slowly develop them, and then publish them to the world.</p>
            </li>
            <li style={style.feature}>
              <span style={style.featureName}>A blog forever</span>
              <p style={style.featureDesc}>MediaOnDemand comes with a promise that your published content will remain online forever.</p>
            </li>
            <li style={style.feature}>
              <span style={style.featureName}>The cleanest writing experience</span>
              <p style={style.featureDesc}>The Svbtle editor is designed to help you write—there are no distractions, and you can format your posts using Markdown, which is easy to learn and easy to write.</p>
            </li>
            <li style={style.feature}>
              <span style={style.featureName}>The best reading experience</span>
              <p style={style.featureDesc}>MediaOnDemand is fast, simple, and beautiful. It’s designed to showcase your writing in the best way possible, with the fewest distractions to your readers.</p>
            </li>
            <li style={style.feature}>
              <InternalLink link="/about">And lots more →</InternalLink>
            </li>
          </ul>
        </div>
      </section>
    )
  }
}

export default HomePage
