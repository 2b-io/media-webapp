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
  <Text size="small" variant="secondary" { ...props }>{ children }</Text>
)

export const AssistiveText = ({ children, ...props }) => (
  <Text size="tiny" { ...props }>{ children }</Text>
)

export const TextLine = ({ children, ...props }) => (
  <Block { ...props }>
    <span>{ children }</span>
  </Block>
)

export const DescriptionTextLine = ({ children, ...props }) => (
  <Block size="small" variant="secondary" { ...props }>
    <span>{ children }</span>
  </Block>
)

export const AssistiveTextLine = ({ children, ...props }) => (
  <Block size="tiny" { ...props }>
    <span>{ children }</span>
  </Block>
)

export const PageTitle = ({ children, ...props }) => (
  <Block size="large" align="center" { ...props }>
    <h1>{ children }</h1>
  </Block>
)

export const Heading = ({ children, ...props }) => (
  <Block { ...props }>
    <h2>{ children }</h2>
  </Block>
)
