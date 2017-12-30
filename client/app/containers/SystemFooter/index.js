import Radium from 'radium'
import React from 'react'
import { InternalLink } from 'components/Link'

import style from './style'

@Radium
class SystemFooter extends React.Component {
  render() {
    return (
      <footer style={style.wrapper}>
        <figure style={style.logoWrapper}>
        </figure>
        <section style={style.menuWrapper}>
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
        </section>
      </footer>
    )
  }
}

export default SystemFooter
