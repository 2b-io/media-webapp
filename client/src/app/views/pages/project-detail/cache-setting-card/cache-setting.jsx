import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'
import { mapDispatch } from 'services/redux-helpers'
import { Heading, Text } from 'ui/typo'
import { Card } from 'ui/elements'
import { EditIcon } from 'ui/icons'

const CacheSetting = ({
  identifier,
  toEditCacheSetting,
  cacheSetting
}) => (
  <Fragment>
    <Card
      title={ () => <Heading mostLeft mostRight>Cache Setting</Heading> }
      fab={ () => <EditIcon onClick={ () => toEditCacheSetting(identifier) } /> }
      content={ () => (
        <Fragment>
          <Text mostLeft mostRight>
            { cacheSetting ?
              `Cache Expire: ${ cacheSetting.expired }s` : 'N/A'
            }
          </Text>
        </Fragment>
      ) }
    />
  </Fragment>
)

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    return {
      identifier,
      cacheSetting: selectors.cacheSetting(state, identifier)
    }
  },
  mapDispatch({
    toEditCacheSetting: (identifier) => actions.requestLocation(`/projects/${ identifier }/cache-setting`),
  })
)(CacheSetting)
