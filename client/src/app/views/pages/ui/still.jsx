import React, { Fragment } from 'react'
import styled from 'styled-components'

import { TitleBar } from 'ui/compounds'

// color

import color from 'color'
import nameThisColor from 'name-this-color'
import palx from 'palx'

const base = '#07c'
const palettes = palx(base)

console.log(palettes)

const categories = Object.keys(palettes)
  .filter(
    name => Array.isArray(palettes[name])
  )
  .map(name => ({
    name,
    colors: nameThisColor(palettes[name])
  }))

console.log(categories)

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
    ({ value }) => value
  };
  color: ${
    ({ value }) => color(value).isDark() ? '#fff' : '#000'
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
        <Color value={ base }>Base Color<br />{ base }</Color>
      </Palette>
      {
        categories.map(
          cat => (
            <Fragment key={ cat.name }>
              <PaletteName>{ cat.name }</PaletteName>
              <Palette>
                {
                  cat.colors.map(
                    ({ hex, name }) => (
                      <Color
                        key={ hex }
                        value={ hex }
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
