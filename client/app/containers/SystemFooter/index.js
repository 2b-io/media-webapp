import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import { InternalLink } from 'components/Link'

import style from './style'

@connect(state => {
  return {
    signedIn: !!(state.app.session && state.app.session.verified)
  }
})
@Radium
class SystemFooter extends React.Component {
  render() {
    return (
      <footer style={style.wrapper}>
        <section style={style.menuWrapper}>
          {this._renderLinks()}
          {this._renderAuthLinks()}
        </section>
      </footer>
    )
  }

  _renderLinks() {
    return (
      <ul style={style.menu}>
        <li style={style.itemWrapper}>
          <InternalLink link="/terms" style={style.item}>
            <span>terms</span>
          </InternalLink>
        </li>
        <li style={style.itemWrapper}>
          <InternalLink link="/privacy" style={style.item}>
            <span>privacy</span>
          </InternalLink>
        </li>
        <li style={style.itemWrapper}>
          <InternalLink link="/help" style={style.item}>
            <span>help</span>
          </InternalLink>
        </li>
      </ul>
    )
  }

  _renderAuthLinks() {
    const { signedIn } = this.props

    if (signedIn) return null

    return (
      <ul style={style.menu}>
        <li style={style.itemWrapper}>
          <InternalLink link="/sign-up" style={style.item}>
            <span>sign up</span>
          </InternalLink>
        </li>
        <li style={style.itemWrapper}>
          <InternalLink link="/sign-in" style={style.item}>
            <span>sign in</span>
          </InternalLink>
        </li>
      </ul>
    )
  }
}

export default SystemFooter
