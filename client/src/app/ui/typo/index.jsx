import React from 'react'
import styled from 'styled-components'

import { font, lineHeight, padding, paragraph, textAlign } from './mixin'

const Block = styled.div`
  ${ font }
  ${ lineHeight }
  ${ padding }
  ${ textAlign }
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > * {
    display: inline-block;
  }
`

export const Text = styled.p`
  ${ font }
  ${ textAlign }
  ${ paragraph }
  ${ padding }
`

export const DescriptionText = ({ children, ...props }) => (
  <Text { ...props } size="small">{ children }</Text>
)

export const AssistiveText = ({ children, ...props }) => (
  <Text { ...props } size="tiny">{ children }</Text>
)

export const TextLine = ({ children, ...props }) => (
  <Block { ...props }>
    <span>{ children }</span>
  </Block>
)

export const DescriptionTextLine = ({ children, ...props }) => (
  <Block { ...props } size="small">
    <span>{ children }</span>
  </Block>
)

export const AssistiveTextLine = ({ children, ...props }) => (
  <Block { ...props } size="tiny">
    <span>{ children }</span>
  </Block>
)

export const PageTitle = ({ children, ...props }) => (
  <Block { ...props } size="large" align="center">
    <h1>{ children }</h1>
  </Block>
)

export const Heading = ({ children, ...props }) => (
  <Block { ...props } bold>
    <h2>{ children }</h2>
  </Block>
)
