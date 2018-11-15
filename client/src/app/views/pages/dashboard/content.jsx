import React, { Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'

import { Card, ResponsiveGrid } from 'ui/elements'
import { Project } from 'views/common/compounds'
import { UsageReportChart } from 'views/common/compounds'

const BREAK_POINTS = {
  phone: 1,
  tablet: 1,
  otherwise: 2
}

const Layout = styled.section`
  padding: 16px;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
  background: #e6e6e6;
`

const Dashboard = ({
  toProjectDetail,
  ui: { pinnedProjects }
}) => {
  if (!pinnedProjects) {
    return <Layout />
  }

  const items = pinnedProjects.map((project) => {
    const {
      bytesDownloaded,
      bytesDownloadData,
      requests,
      requestData
    } = project

    return {
      content: () => (
        <Card
          key={ project.identifier }
          onClick={ toProjectDetail.bind(null, project.identifier) }
          content={ () => (
            <Fragment>
              <Project project={ project } />
              <UsageReportChart
                data={ { bytesDownloaded, requests } }
                period={ 'hourly' }
                usageData={ bytesDownloadData }
                requestData={ requestData }
              />
            </Fragment>
          ) }
        />
      )
    }
  })

  return (
    <Layout>
      <ResponsiveGrid
        breakpoints={ BREAK_POINTS }
        items={ items }
      />
    </Layout>
  )
}

export default connect(
  null,
  mapDispatch({
    toProjectDetail: slug => actions.requestLocation(`/projects/${ slug }`)
  })
)(Dashboard)
