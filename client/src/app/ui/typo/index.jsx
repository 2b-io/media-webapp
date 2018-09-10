import React from 'react'
import styled, { css } from 'styled-components'

import { font, lineHeight, paragraph, textAlign } from './mixin'

const Block = styled.div`
  ${ font }
  ${ lineHeight }
  ${ textAlign }
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > span {
    display: inline-block;
  }
`

export const Text = styled.p`
  ${ font }
  ${ textAlign }
  ${ paragraph }
`

export const AssistiveText = ({ children, ...props }) => (
  <Text size="small">{ children }</Text>
)

export const TextLine = ({ children, ...props }) => (
  <Block { ...props }>
    <span>{ children }</span>
  </Block>
)

export const AssistiveTextLine = ({ children, ...props }) => (
  <Block { ...props } size="small">
    <span>{ children }</span>
  </Block>
)

export const Heading = ({ children, ...props }) => (
  <Block { ...props } size="large">
    <h1>{ children }</h1>
  </Block>
)
