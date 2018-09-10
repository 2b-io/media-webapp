import React from 'react'
import styled, { css } from 'styled-components'

const sizeToPixel = (size = 'normal') => (
  size === 'normal' ? 14 : (
    size === 'small' ? 12 : 10
  )
)

const textAlign = ({ align }) => css`
  text-align: ${ align };
`

const fontSize = ({ size }) => css`
  font-size: ${ sizeToPixel(size) }px;
  line-height: ${ sizeToPixel(size) }px;
`

const lineHeight = ({ size }) => css`
  line-height: ${
    sizeToPixel(size) < 14 ? 16 : 40
  }px;
`

const Block = styled.div`
  ${ fontSize }
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
  ${ fontSize }
  ${ textAlign }
  padding-top: 8px;
  padding-bottom: 8px;
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
  <Block { ...props }>
    <h1>{ children }</h1>
  </Block>
)
