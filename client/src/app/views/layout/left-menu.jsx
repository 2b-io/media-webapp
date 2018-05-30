import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { actions, selectors } from 'state/interface'
import { Identicon } from 'ui/elements'

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

const LeftMenu = ({ session, signOut, width }) => (
  <Menu width={ width }>
    { session &&
      <Identicon size={ 48 } id={ session.account.email } />
    }
    <button onClick={ signOut }>Sign Out</button>
  </Menu>
)

export default connect(
  state => ({
    session: selectors.currentSession(state)
  }),
  dispatch => ({
    signOut: () => dispatch(actions.closeLayout())
  })
)(LeftMenu)
