import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Card, ResponsiveGrid } from 'ui/elements'
import { DescriptionText, TextLine } from 'ui/typo'

const BREAK_POINTS = {
  phone: 1,
  tablet: 2,
  laptop: 3,
  desktop: 4,
  otherwise: 5
}

const Layout = styled.section`
  padding: 16px;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
  background: #e6e6e6;
`

const Reports = ({
  toUsageReport
}) => (
  <Layout>
    <ResponsiveGrid
      breakpoints={ BREAK_POINTS }
      items={ [
        {
          content: () => (
            <Card
              interactable
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
          )
        }
      ] }
    />
  </Layout>
)

export default connect(
  null,
  mapDispatch({
    toUsageReport: () => actions.requestLocation('/reports/usage')
  })
)(Reports)
