import React, { Fragment } from 'react'
import styled from 'styled-components'

import { TitleBar } from 'ui/compounds'

// color

import color from 'color'
import nameThisColor from 'name-this-color'
import palx from 'palx'

const base = '#0ff'
const p = palx(base)
const palettes = Object.keys(p)
  .filter(
    name => Array.isArray(p[name])
  )
  .map(name => ({
    name,
    colors: nameThisColor(p[name])
  }))

const Palette = styled.section`
  display: flex;
  padding: 10px 20px;
  justify-content: space-around;
`

const PaletteName = styled.h2`
  padding: 10px 20px;
`

const Color = styled.div`
  flex-basis: 30px;
  flex-grow: 1;
  flex-shrink: 0;
  margin: 5px;
  padding: 5px;
  min-height: 60px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${
    ({ hex }) => hex
  };
  color: ${
    ({ hex }) => color(hex).isDark() ? '#fff' : '#000'
  };
`

const UI = () => (
  <Fragment>
    <TitleBar>
      <TitleBar.Title>
        <h1>UI</h1>
      </TitleBar.Title>
    </TitleBar>
    <div>
      <Palette>
        <Color hex={ base }>Base Color<br />{ base }</Color>
      </Palette>
      {
        palettes.map(
          palette => (
            <Fragment key={ palette.name }>
              <PaletteName>{ palette.name }</PaletteName>
              <Palette>
                {
                  palette.colors.map(
                    ({ hex, name }) => (
                      <Color
                        key={ hex }
                        hex={ hex }
                      >
                        <span>{ name }<br />{ hex }</span>
                      </Color>
                    )
                  )
                }
              </Palette>
            </Fragment>
          )
        )
      }
    </div>
  </Fragment>
)

export default UI
