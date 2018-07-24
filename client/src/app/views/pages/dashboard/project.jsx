import React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import preventDefault from 'services/prevent-default'

const Box = styled.div`
  max-width: 600px;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const BoxItem = styled.div`
  margin: ${ ({ theme }) => `${ theme.spacing.medium }` };
  padding-bottom: ${ ({ theme }) => `${ theme.spacing.medium }` };
`

const Title = styled.div`
  padding: ${ ({ theme }) => `${ theme.spacing.small }` };
  text-transform: capitalize;
  font-weight: bold;
  ${
    ({ theme }) => css`
      border-bottom: 1px solid ${ theme.secondary.light.base };
    `
  }
`

const StyledProject = styled.div`
  padding-top: ${ ({ theme }) => `${ theme.spacing.medium }` };
`

const StyledLink = styled.a`
  display: block;
  text-decoration:none;
  padding: ${ ({ theme }) => `${ theme.spacing.small }` };
`

const ProjectLink = ({ onClick, ...props }) => (
  <StyledLink onClick={ preventDefault(onClick) } { ...props } />
)


const ProjectItem = ({ project, toProjectDetail }) => (
  <StyledProject>
    <ProjectLink href="/" onClick={ toProjectDetail }>{ project.name }</ProjectLink>
  </StyledProject>
)

const ProjectList = ({ projects, toProjectDetail }) => {
  if (!projects || !projects.length) {
    return (
      <h2>No data ....</h2>
    )
  }

  return (
    <div>
      {
        projects.map(
          project => (
            <ProjectItem key={ project._id }
              project={ project }
              toProjectDetail={ toProjectDetail.bind(null, project.slug) }
            />
          )
        )
      }
    </div>
  )
}

const Project = ({ projects, toProjectDetail }) => (
  <Box>
    <BoxItem>
      <Title>Project</Title>
      <ProjectList projects={ projects } toProjectDetail={ toProjectDetail } />
    </BoxItem>
  </Box>
)


export default connect(
  mapState({
    projects: selectors.allProjects,
  }),
  mapDispatch({
    toProjectDetail: slug => actions.requestLocation(`/projects/${ slug }`)
  })
)(Project)



