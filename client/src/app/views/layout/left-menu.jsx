import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { actions } from 'state/interface'

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: ${
    ({ width }) => `${width}px`
  };
  margin-left: auto;
  margin-right: auto;
`

const LeftMenu = ({ signOut, width }) => (
  <Menu width={ width }>
    <button onClick={ signOut }>Sign Out</button>
  </Menu>
)

export default connect(
  null,
  dispatch => ({
    signOut: () => dispatch(actions.closeLayout())
  })
)(LeftMenu)
