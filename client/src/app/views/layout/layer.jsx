import styled, { css } from 'styled-components'

const Layer = styled.section`
  ${
    ({ isBackground }) => isBackground &&
      css`
        filter: blur(2px)
      `
  }
`

export default Layer
