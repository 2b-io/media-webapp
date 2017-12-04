import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import IconFacebook from 'react-icons/lib/io/social-facebook'
import IconTwitter from 'react-icons/lib/io/social-twitter'

import { LAYOUT } from 'actions/layout'
import { InternalLink } from 'components/Link'

import { footerStyle } from './style'

@connect(state => ({ layout: state.layout }))
@Radium
class Footer extends React.PureComponent {
  render() {
    const { mode } = this.props.layout

    switch (mode) {
      case LAYOUT.SYSTEM_MODE:
        return this._renderSystemFooter()
    }

    return null
  }

  _renderSystemFooter() {
    return (
      <div style={footerStyle.wrapper}>
        <div style={footerStyle.links}>
          <div style={footerStyle.linkSection}>
            <ul>
              <li style={footerStyle.linkSectionItems}>
                <span style={footerStyle.linkSessionHeading}>Using Media On Demand</span>
              </li>
              <li style={footerStyle.linkSectionItems}>
                <InternalLink link="/" style={footerStyle.link}>Product</InternalLink>
              </li>
              <li style={footerStyle.linkSectionItems}>
                <InternalLink link="/" style={footerStyle.link}>Pricing</InternalLink>
              </li>
              <li style={footerStyle.linkSectionItems}>
                <InternalLink link="/" style={footerStyle.link}>Support</InternalLink>
              </li>
              <li style={footerStyle.linkSectionItems}>
                <InternalLink link="/" style={footerStyle.link}>Guides</InternalLink>
              </li>
              <li style={footerStyle.linkSectionItems}>
                <InternalLink link="/" style={footerStyle.link}>API</InternalLink>
              </li>
            </ul>
          </div>
          <div style={footerStyle.linkSection}>
            <ul>
              <li style={footerStyle.linkSectionItems}>
                <span style={footerStyle.linkSessionHeading}>Media Nework</span>
              </li>
              <li style={footerStyle.linkSectionItems}>
                <InternalLink link="/" style={footerStyle.link}>Jobs</InternalLink>
              </li>
              <li style={footerStyle.linkSectionItems}>
                <InternalLink link="/" style={footerStyle.link}>Customers</InternalLink>
              </li>
              <li style={footerStyle.linkSectionItems}>
                <InternalLink link="/" style={footerStyle.link}>Developers</InternalLink>
              </li>
              <li style={footerStyle.linkSectionItems}>
                <InternalLink link="/" style={footerStyle.link}>Events</InternalLink>
              </li>
              <li style={footerStyle.linkSectionItems}>
                <InternalLink link="/" style={footerStyle.link}>Blogs</InternalLink>
              </li>
            </ul>
          </div>
          <div style={footerStyle.linkSection}>
            <ul>
              <li style={footerStyle.linkSectionItems}>
                <span style={footerStyle.linkSessionHeading}>Legal</span>
              </li>
              <li style={footerStyle.linkSectionItems}>
                <InternalLink link="/" style={footerStyle.link}>Privacy</InternalLink>
              </li>
              <li style={footerStyle.linkSectionItems}>
                <InternalLink link="/" style={footerStyle.link}>Security</InternalLink>
              </li>
              <li style={footerStyle.linkSectionItems}>
                <InternalLink link="/" style={footerStyle.link}>Terms of Service</InternalLink>
              </li>
              <li style={footerStyle.linkSectionItems}>
                <InternalLink link="/" style={footerStyle.link}>Policies</InternalLink>
              </li>
            </ul>
          </div>
          <div style={footerStyle.linkSection}>
            <ul>
              <li style={footerStyle.linkSectionItems}>
                <span style={footerStyle.linkSessionHeading}>Handy Links</span>
              </li>
              <li style={footerStyle.linkSectionItems}>
                <InternalLink link="/" style={footerStyle.link}>Github</InternalLink>
              </li>
              <li style={footerStyle.linkSectionItems}>
                <InternalLink link="/" style={footerStyle.link}>Status</InternalLink>
              </li>
            </ul>
          </div>
        </div>
        <div style={footerStyle.note}>
          <div style={footerStyle.right}>
            <InternalLink link="/help" style={footerStyle.contactUs}>Contact Us</InternalLink>
            <div style={footerStyle.contactItem}>
              <IconFacebook size={20} color="#717274" />
            </div>
            <div style={footerStyle.contactItem}>
              <IconTwitter size={20} color="#717274" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
