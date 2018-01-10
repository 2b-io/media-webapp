import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import { signOut } from 'actions/session'
import { InternalLink } from 'components/Link'

import { content as style } from './style'

@connect(state => {
  return {
    signedIn: !!(state.app.session && state.app.session.verified)
  }
})
@Radium
class DrawerContent extends React.Component {
  constructor(props) {
    super(props)

    this._signOut = this._signOut.bind(this)
  }

  render() {
    const { signedIn } = this.props

    return (
      <ul style={style.wrapper}>
        <li>
          <InternalLink link="/" style={style.heading}>
            <span>MediaNetwork</span>
          </InternalLink>
        </li>
        <li>
          <InternalLink link="/about" style={style.item}>
            <span>about</span>
          </InternalLink>
        </li>
        <li>
          <InternalLink link="/help" style={style.item}>
            <span>help</span>
          </InternalLink>
        </li>
        { signedIn ?
            this._renderPersonalMenu() :
            this._renderPublicMenu()
        }
      </ul>
    )
  }

  _renderPublicMenu() {
    return [
      <li key="sign-up">
        <InternalLink link="/sign-up" style={style.item}>
          <span>sign up</span>
        </InternalLink>
      </li>,
      <li key="sign-in">
        <InternalLink link="/sign-in" style={style.item}>
          <span>sign in</span>
        </InternalLink>
      </li>
    ]
  }

  _renderPersonalMenu() {
    return [
      <li key="dashboard">
        <InternalLink link="/dashboard" style={style.item}>
          <span>dashboard</span>
        </InternalLink>
      </li>,
      <li key="account">
        <InternalLink link="/account" style={style.item}>
          <span>account</span>
        </InternalLink>
      </li>,
      <li key="sign-out">
        <span style={style.item} onClick={this._signOut}>sign out</span>
      </li>
    ]
  }

  _signOut() {
    const { dispatch } = this.props

    dispatch(signOut())
  }
}

export default DrawerContent
