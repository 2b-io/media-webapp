import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

// icons
import IconMenu from 'react-icons/lib/io/navicon-round'

// internal
import { toggleAppMenu } from 'actions/drawer';

// local
import style from './style'

@connect()
@Radium
class AccountHeader extends React.Component {
  constructor(props) {
    super(props)

    this._openSystemMenu = this._openSystemMenu.bind(this)
  }

  render() {
    return (
      <div style={style.wrapper}>
        <div style={style.container}>
          <div style={style.menuIcon}
            onClick={this._openSystemMenu}>
            <IconMenu size={32} />
          </div>
        </div>
      </div>
    )
  }

  _openSystemMenu() {
    const { dispatch } = this.props

    dispatch(toggleAppMenu(true))
  }
}

export default AccountHeader
