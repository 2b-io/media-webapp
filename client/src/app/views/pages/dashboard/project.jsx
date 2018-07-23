import React from 'react'
import styled, { css } from 'styled-components'

import { Link } from 'ui/elements'

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
`

const Box = styled.div`
  max-width: 600px
  width: 600px
  flex-grow: 1
  @media (max-width: 768px) {
    width: 100%
  }
`

const BoxItem = styled.div`
  margin: ${ ({ theme }) => `${ theme.spacing.medium }` }
  padding-bottom: ${ ({ theme }) => `${ theme.spacing.medium }` }
`

const BoxTitle = styled.div`
  padding: ${ ({ theme }) => `${ theme.spacing.small }` }
  text-transform: capitalize
  font-weight: bold
  ${ ({ theme }) =>
      css`
        border-bottom: 1px solid ${ theme.secondary.light.base }
      `
  }
`

const dashboardList = ['Project', '', '', '']

const Project = () => (
  <Wrapper>
  {
    dashboardList.map((title) => title &&
      <Box>
        <BoxItem>
          <BoxTitle>{title}</BoxTitle>
        </BoxItem>
      </Box>
    )
  }
  </Wrapper>
)

export default Project
