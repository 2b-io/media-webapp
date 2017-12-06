import Radium from 'radium'
import React from 'react'

import IconHome from 'react-icons/lib/io/home'
import IconAccount from 'react-icons/lib/io/android-person'
import IconAnalytics from 'react-icons/lib/io/stats-bars'

import { InternalLink } from 'components/Link'

import style from './style'

@Radium
class Content extends React.Component {
  render() {
    return (
      <div style={style.wrapper}>
        <ul style={style.personalMenu}>
          <li style={style.menuItem}>
            <IconHome size={20} style={style.menuIcon} />
            <InternalLink link="/" style={style.menuText}>Home</InternalLink>
          </li>
          <li style={style.menuItem}>
            <IconAccount size={20} style={style.menuIcon} />
            <InternalLink link="/account" style={style.menuText}>Account & Profile</InternalLink>
          </li>
          <li style={style.menuItem}>
            <IconAnalytics size={20} style={style.menuIcon} />
            <InternalLink link="/analytics" style={style.menuText}>Analytics</InternalLink>
          </li>
        </ul>
        <h3 style={style.administrationHeading}>Administration</h3>
        <ul style={style.administratorMenu}>
          <li>
            <InternalLink link="/" style={style.menuText}>Settings & Permissions</InternalLink>
          </li>
          <li>
            <InternalLink link="/" style={style.menuText}>Manage Projects</InternalLink>
          </li>
          <li>
            <InternalLink link="/" style={style.menuText}>Invitations</InternalLink>
          </li>
          <li>
            <InternalLink link="/" style={style.menuText}>Billing</InternalLink>
          </li>
          <li>
            <InternalLink link="/" style={style.menuText}>Authentication</InternalLink>
          </li>
        </ul>
      </div>
    )
  }
}

export default Content
