import Radium from 'radium'
import React from 'react'

import IconSignOut from 'react-icons/lib/io/log-out'
import IconAPI from 'react-icons/lib/io/link'

import { InternalLink } from 'components/Link'

import style from './style'


@Radium
class Bottom extends React.Component {
  render() {
    return (
      <div style={style.wrapper}>
        <ul>
          <li style={style.linkItem}>
            <InternalLink link="/analytics" style={style.linkText}>Guides</InternalLink>
          </li>
          <li style={style.linkItem}>
            <InternalLink link="/analytics" style={style.linkText}>Help</InternalLink>
          </li>
          <li style={style.linkItem}>
            <InternalLink link="/analytics" style={style.linkText}>API</InternalLink>
            <IconAPI size={20} style={style.linkIcon} />
          </li>
          <li style={style.linkItem}>
            <InternalLink link="/analytics" style={style.linkText}>Pricing</InternalLink>
          </li>
          <li style={style.linkItem}>
            <InternalLink link="/analytics" style={style.linkText}>Policies</InternalLink>
          </li>
          <li style={style.linkItem}>
            <InternalLink link="/analytics" style={style.linkText}>Our Blog</InternalLink>
          </li>
          <li style={style.linkItem}>
            <InternalLink link="/analytics" style={style.linkText}>Contact</InternalLink>
          </li>
          <li style={style.linkItem}>
            <InternalLink link="/analytics" style={style.linkText}>Sign Out</InternalLink>
            <IconSignOut size={20} style={style.linkIcon} />
          </li>
        </ul>
      </div>
    )
  }
}

export default Bottom
