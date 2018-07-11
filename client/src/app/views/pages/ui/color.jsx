import React, { Fragment } from 'react'
import styled from 'styled-components'

// color
import color from 'color'
import nameThisColor from 'name-this-color'
import palx from 'palx'

const mainColors = [ 'gray', 'red', 'orange', 'green', 'cyan', 'blue', 'indigo' ]
const primary = {
  base: '#07f',
  white: '#fff',
  black: '#000'
}

const p = palx(primary.base)
const palettes = Object.keys(p)
  .filter(
    name => Array.isArray(p[name]) && mainColors.includes(name)
  )
  .map(name => ({
    name,
    colors: nameThisColor(p[name])
  }))

const Palette = styled.section`
  display: flex;
  justify-content: space-between;
`

const PaletteName = styled.h2`
  padding: 10px 0;
`

console.log(p)

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
  border: 1px solid #000;
`

const ColorSection = () => (
  <section>
    <Palette>
      <Color hex={ primary.base }>base<br />{ primary.base }</Color>
      <Color hex={ primary.white }>white<br />{ primary.white }</Color>
      <Color hex={ primary.black }>black<br />{ primary.black }</Color>
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
  </section>
)

export default ColorSection
