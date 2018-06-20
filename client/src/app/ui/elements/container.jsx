import styled, { css } from 'styled-components'

const Container = styled.div`
  padding: 10px;
  ${
    ({ center }) => center ? css`
      margin-left: auto;
      margin-right: auto;
    ` : null
  }
  max-width: ${
    ({ size = 'auto' }) => {
      switch (size) {
        case 'large':
          return '1150px'
        case 'small':
          return '360px'
      }

      return 'none'
    }
  }
`

export default Container
