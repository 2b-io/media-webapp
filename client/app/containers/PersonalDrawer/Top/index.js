import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import Identicon from 'components/Identicon'

import style from './style'

@connect(state => ({ session: state.app.session }))
@Radium
class Top extends React.PureComponent {
  render() {
    const { account } = this.props.session

    if (!account) {
      return null
    }

    return (
      <div style={style.wrapper}>
        <div style={style.accountAvatar}>
          <Identicon id={account.email} size={48} />
        </div>
        <div style={style.accountInfo}>
          <h3 style={style.signedIn}>Signed in as</h3>
          <p style={style.accountName}>{account.email}</p>
        </div>
      </div>
    )
  }
}

export default Top
