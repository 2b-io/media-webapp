import React, { Fragment } from 'react'
import styled from 'styled-components'

// color
import color from 'color'

import { base, black, white, palettes } from 'views/themes/default'

const Palette = styled.section`
  display: flex;
  justify-content: flex-start;
  border: 1px solid ${ ({ theme }) => theme.secondary.base };
  overflow: hidden;
`

const PaletteName = styled.h2`
  padding: ${ ({ theme }) => `${ theme.spacing.small } 0` };
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
    padding: ${ ({ theme }) => theme.spacing.tiny };;
    text-align: center;
    content: "${ ({ index }) => index }";
  }

  &:after {
    padding:  ${ ({ theme }) => theme.spacing.tiny };
    text-align: center;
    content: "${ ({ name }) => name }";
    flex-grow: 1;
  }
`

const Variant = styled.div.attrs({
  children: ({ hex }) => hex,
  style: ({ hex }) => ({
    background: hex,
    color: color(hex).isDark() ? white : black
  })
})`
  padding: ${ ({ theme }) => theme.spacing.tiny };;
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
        <Variant hex={ white } />
      </Color>
      <Color name="Base">
        <Variant hex={ base } />
      </Color>
      <Color name="Black">
        <Variant hex={ black } />
      </Color>
    </Palette>
    {
      Object.values(palettes).map(
        palette => (
          <Fragment key={ palette.name }>
            <PaletteName>{ palette.name }</PaletteName>
            <Palette>
              {
                palette.colors.map(
                  ({ closest, hex, name }, index) => (
                    <Color key={ hex }
                      name={ name }
                      index={ index }
                    >
                      <Variant hex={ hex } />
                      <Variant hex={ closest } />
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
