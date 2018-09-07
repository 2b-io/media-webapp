import React, { Fragment } from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .3);
  z-index: 1;
`

const Surface = styled.div`
  position: absolute;
  width: 256px;
  top: 0;
  bottom: 0;
  left: 0;
  background: #fff;
  z-index: 1;
  transform: ${
    ({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'
  };
`

const Content = styled.div`
  display: grid;
  grid-template-rows: 160px 1fr;
  height: 100%;
`

const Menu = ({ open = true }) => (
  <Fragment>
    { open && <Overlay /> }
    <Surface open={ open }>
      <Content>
        <div className="profile"></div>
        <div className="menu">
        </div>
      </Content>
    </Surface>
  </Fragment>
)

export default Menu
