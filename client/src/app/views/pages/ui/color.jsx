import React, { Fragment } from 'react'
import styled from 'styled-components'

// color
import color from 'color'
import ntc from 'ntc'
import palx from 'palx'

const mainColors = [ 'gray', 'red', 'orange', 'green', 'cyan', 'blue', 'indigo' ]
const primary = {
  base: '#00f',
  white: '#fff',
  black: '#000'
}

const p = palx(primary.base)
const palettes = Object.keys(p)
  .filter(
    name => Array.isArray(p[name]) && (mainColors.length === 0 || mainColors.includes(name))
  )
  .map(name => ({
    name,
    colors: p[name].map(color => {
      const [ hex, name ] = ntc.name(color)

      return {
        origin: color,
        hex: hex.toLowerCase(),
        name
      }
    })
  }))

const Palette = styled.section`
  display: flex;
  justify-content: center;
  border: 1px solid black;
`

const PaletteName = styled.h2`
  padding: 10px 0;
`

const Color = styled.div`
  flex-basis: 30px;
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  font-size: 11px;
  flex-direction: column;
  align-items: stretch;

  &:before {
    padding: 5px;
    text-align: center;
    content: "${ ({ index }) => index }";
  }

  &:after {
    padding: 5px;
    text-align: center;
    content: "${ ({ name }) => name }";
    flex-grow: 1;
  }
`

const Variant = styled.div.attrs({
  children: ({ hex }) => hex
})`
  padding: 5px;
  background: ${
    ({ hex }) => hex
  };
  color: ${
    ({ hex }) => color(hex).isDark() ? '#fff' : '#000'
  };
  height: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ColorSection = () => (
  <section>
    <Palette>
      <Color name="White">
        <Variant hex={ primary.white } />
      </Color>
      <Color name="Base">
        <Variant hex={ primary.base } />
      </Color>
      <Color name="Black">
        <Variant hex={ primary.black } />
      </Color>
    </Palette>
    {
      palettes.map(
        palette => (
          <Fragment key={ palette.name }>
            <PaletteName>{ palette.name }</PaletteName>
            <Palette>
              {
                palette.colors.map(
                  ({ origin, hex, name }, index) => (
                    <Color key={ origin }
                      name={ name }
                      index={ index }
                    >
                      <Variant hex={ origin } />
                      <Variant hex={ hex } />
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
