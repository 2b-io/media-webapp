import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'
import { mapDispatch } from 'services/redux-helpers'
import { Heading, Text } from 'ui/typo'
import { Card } from 'ui/elements'
import { EditIcon } from 'ui/icons'

import stringToList from 'services/string-to-list'

const PullSettings = ({
  identifier,
  toEditPullSetting,
  pullSetting = {}
}) => {

  const allowedOrigins = stringToList(pullSetting.allowedOrigins)

  const filteredHeaders = (pullSetting.headers || []).filter(
    (header) => !!(header && header.name && header.value)
  )

  return (
    <Fragment>
      <Card
        title={ () => <Heading mostLeft mostRight>Pull Settings</Heading> }
        fab={ () => <EditIcon onClick={ () => toEditPullSetting(identifier) } /> }
        content={ () => (
          <Fragment>
            <Text mostLeft mostRight>
              Pull URL:<br />
              &nbsp;&nbsp;{ pullSetting.pullURL || 'N/A' }<br />
            </Text>
            <Text mostLeft mostRight>
              Allowed Origins:<br />
              {
                allowedOrigins.length &&
                  allowedOrigins.map(
                    (origin, index) => (
                      <Fragment key={ index }>- { origin }<br /></Fragment>
                    )
                  ) || ( <Fragment>&nbsp;&nbsp;N/A<br /></Fragment> )
              }
            </Text>
            <Text mostLeft mostRight>
              Headers:<br />
              {
                filteredHeaders.length &&
                  filteredHeaders.map(
                    ({ name, value }, index) => (
                      <Fragment key={ index }>- { name }: { value }<br /></Fragment>
                    )
                  ) || ( <Fragment>&nbsp;&nbsp;N/A<br /></Fragment> )
              }
            </Text>
          </Fragment>
        ) }
      />
    </Fragment>
  )
}

export default connect(
  (state, { identifier }) => ({
    pullSetting: selectors.pullSetting(state, identifier)
  }),
  mapDispatch({
    toEditPullSetting: (identifier) => actions.requestLocation(`/projects/${ identifier }/pull-setting`),
  })
)(PullSettings)
