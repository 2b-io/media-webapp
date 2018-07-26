import styled, { css } from 'styled-components'

const Layer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${
    ({ isBackground }) => isBackground &&
      css`
        filter: blur(2px)
      `
  }
`

export default Layer
