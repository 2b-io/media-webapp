import React, { Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { actions } from 'state/interface'
import { Button, Link, Nowrap } from 'ui/elements'
import { modal } from 'views/common/decorators'
import { mapDispatch } from 'services/redux-helpers'
import { Panel } from 'ui/compounds'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: ${
    ({ theme }) => theme.spacing.medium
  }
`

const WrapperInfo = styled.div`
  padding: ${
    ({ theme }) => `${ theme.spacing.small } 0`
  }
`

const Image = styled.img`
  max-height: 100%;
  @media (min-width: 300px) {
    max-height: 200px;
  }
  @media (min-width: 600px) {
    max-height: 300px;
  }
  @media (min-width: 800px) {
    max-height: 450px;
  }
  max-width: 100%;
  display: block;
`

const getContentLength = (contentLength) => {
  const BYTES_TO_MB = 1/1048576
  const BYTES_TO_KB = 1/1024
  return `${ contentLength*BYTES_TO_MB>1 ? contentLength*BYTES_TO_MB+' MB' : contentLength*BYTES_TO_KB+' KB' }`
}

const ProjectMediaModal = ({
  removeProjectMedia,
  modal: { params: { mediaInfo } }
}) => {

  return (
    <Fragment>
      <Panel>
        <Panel.Content>
          <Wrapper>
            <Image
              src={ mediaInfo.path }
            />
          </Wrapper>
        </Panel.Content>
        <Panel.Footer>
          <WrapperInfo>
            <Nowrap>
              Project: { mediaInfo.project }
            </Nowrap>
            <Nowrap>
              Image name: { mediaInfo.id }
            </Nowrap>
            <Nowrap>
              Content Type: { mediaInfo.contentType }
            </Nowrap>
            <Nowrap>
              Content Length: { getContentLength(mediaInfo.contentLength) }
            </Nowrap>
            <Nowrap>
              OriginUrl: <Link target="_blank" href={ mediaInfo.originUrl }>{ mediaInfo.originUrl }</Link>
            </Nowrap>
            <Nowrap>
              Path: <Link target="_blank" href={ mediaInfo.path }>{ mediaInfo.path }</Link>
            </Nowrap>
            <Button
              plain
              onClick={ () => removeProjectMedia(mediaInfo.project, mediaInfo.id) }
            >Remove media</Button>
          </WrapperInfo>
        </Panel.Footer>
      </Panel>
    </Fragment>
  )
}

export default modal({
  name: 'ProjectMediaModal'
})(
  connect(
    null,
    mapDispatch({
      removeProjectMedia: actions.removeProjectMedia
    })
  )(ProjectMediaModal)
)
