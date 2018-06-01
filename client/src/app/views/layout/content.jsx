import React, { Component, Fragment } from 'react'
import styled, { css } from 'styled-components'

const StyledContent = styled.div`
  position: absolute;
  background-color: #eee;
  padding: 20px;
  transition: top 1.2s cubic-bezier(.4, 0, .2, 1);
  left: 0;
  right: 0;
  top: ${
    ({ shown, stillHeight }) => shown ? `${stillHeight}px` : '100%'
  };
  ${
    ({ shadow }) => shadow ? css`bottom: 0;` : null
  }
`

const Content = ({ children, shown, stillHeight }) => (
  <Fragment>
    <StyledContent shadow
      shown={ shown }
      stillHeight={ stillHeight }
    />
    <StyledContent
      shown={ shown }
      stillHeight={ stillHeight }>
      { children }
    </StyledContent>
  </Fragment>
)

export default Content
