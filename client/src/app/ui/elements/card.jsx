import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'

import { Break } from 'ui/elements'

const Wrapper = styled.section`
  background: ${
    ({ theme }) => theme.white.base
  };
  color: ${
    ({ theme }) => theme.white.on.base
  };

  ${
    ({ interactable, theme }) => interactable && css`
      transition: background .3s;
      cursor: ${ theme.mouseDetected ? 'pointer' : 'unset' };

      ${
        theme.mouseDetected && !theme.touchDetected && css`
          &:hover {
            background: ${ theme.white.dark.base };
          }
        `
      }
    `
  }
`

const Header = styled.div`
  position: relative;
  height: 40px;
  ${
    ({ hasFab }) => hasFab && css`
      padding-right: 64px;
    `
  }
`

const HeaderBorder = styled.div`
  position: absolute;
  height: 2px;
  left: 0;
  right: 0;
  bottom: -1px;
  background: ${
    ({ theme }) => theme.black.base
  };
  z-index: 0;
`

const Fab = styled.button`
  position: absolute;
  right: 16px;
  bottom: -16px;
  z-index: 1;
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 40px;
  appearance: none;
  background: ${
    ({ theme }) => theme.white.base
  };
  color: ${
    ({ theme }) => theme.white.on.base
  };
  outline: none;
  border: none;

  ${
    ({ disabled, theme }) => theme.mouseDetected && css`
      cursor: ${ disabled ? 'not-allowed' : 'pointer' };

      ${
        !theme.touchDetected && css`
          &:hover {
            background: ${ theme.white.dark.base };
          }
        `
      }
    `
  }
`

const FabBorder = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid ${ ({ theme }) => theme.black.base };
  border-radius: 50%;
`

const FabContent = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
`

const Content = styled.div`
`

//fabClick is action to change click from icon into Fab
const Card = ({ title, fab, fabClick, content, ...props }) => (
  <Wrapper { ...props }>
    { title && (
      <Fragment>
        <Header hasFab={ !!fab }>
          { title && title() }
          { fab && (
            <Fab onClick={ fabClick && fabClick }>
              <FabBorder />
              <FabContent>{ fab() }</FabContent>
            </Fab>
          ) }
          <HeaderBorder />
        </Header>
        <Break />
      </Fragment>
    ) }
    <Content>
      { content && content() }
    </Content>
  </Wrapper>
)

export default Card
