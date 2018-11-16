import styled, { css } from 'styled-components'

import PrimaryButton from './primary-button'

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row-reverse;

    & > ${ PrimaryButton } {
      margin: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
`

export default ButtonGroup
