import Radium from 'radium'
import React from 'react'

import { InternalLink } from 'components/Link'

import style from './style'

@Radium
class Content extends React.Component {
  render() {
    return (
      <div style={style.wrapper}>
        <ul style={style.personalMenu}>
          <li style={style.menuItem}>
            <InternalLink link="/">Home</InternalLink>
          </li>
          <li style={style.menuItem}>
            <InternalLink link="/account">Account & Profile</InternalLink>
          </li>
          <li style={style.menuItem}>
            <InternalLink link="/analytics">Analytics</InternalLink>
          </li>
        </ul>
        <h3 style={style.administrationHeading}>Administration</h3>
        <ul style={style.administratorMenu}>
          <li style={style.menuItem}>
            <InternalLink link="/">Settings & Permissions</InternalLink>
          </li>
          <li style={style.menuItem}>
            <InternalLink link="/">Manage Projects</InternalLink>
          </li>
          <li style={style.menuItem}>
            <InternalLink link="/">Invitations</InternalLink>
          </li>
          <li style={style.menuItem}>
            <InternalLink link="/">Billing</InternalLink>
          </li>
          <li style={style.menuItem}>
            <InternalLink link="/">Authentication</InternalLink>
          </li>
        </ul>
      </div>
    )
  }
}

export default Content
