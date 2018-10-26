import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Card } from 'ui/elements'
import { AddIcon } from 'ui/icons'
import { Text } from 'ui/typo'
import { Project } from 'views/common/compounds'

import { DescriptionText, TextLine } from 'ui/typo'

const Layout = styled.section`
  padding: 16px;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
  background: #e6e6e6;
`

const Container = styled.div`
  display: grid;
  & > * {
    min-height: 0;
    min-width: 0;
  }

  grid-gap: 16px;
  grid-template-columns: 100%;
`

const ProjectList = ({
  toUsageReport
}) => {
  return (
    <Layout>
      <Container>
        <Card
          onClick={ toUsageReport }
          content={ () => (
            <Fragment>
              <TextLine mostLeft mostRight>
                Usage Report
              </TextLine>
              <DescriptionText readOnly mostLeft mostRight>
                The following charts show selected values from the AWS Usage Report for CloudFront.
              </DescriptionText>
            </Fragment>
          ) }
        />
      </Container>
    </Layout>
  )
}

export default connect(
  null,
  mapDispatch({
    toUsageReport: () => actions.requestLocation('/reports/usage-report')
  })
)(ProjectList)
