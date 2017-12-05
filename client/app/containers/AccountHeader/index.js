import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

// icons
import IconMenu from 'react-icons/lib/io/navicon-round'
import IconAddProject from 'react-icons/lib/io/plus'

// internal
import { toggleAccountMenu } from 'actions/drawer';

// local
import style from './style'

@connect()
@Radium
class AccountHeader extends React.Component {
  constructor(props) {
    super(props)

    this._openAccountMenu = this._openAccountMenu.bind(this)
  }

  render() {
    return (
      <div style={style.wrapper}>
        <div style={style.container}>
          <div style={style.menuIcon}
            onClick={this._openAccountMenu}>
            <IconMenu size={32} />
          </div>
          <div style={style.addProjectIcon}>
            <IconAddProject size={32} />
          </div>
        </div>
      </div>
    )
  }

  _openAccountMenu() {
    const { dispatch } = this.props

    dispatch(toggleAccountMenu(true))
  }
}

export default AccountHeader
