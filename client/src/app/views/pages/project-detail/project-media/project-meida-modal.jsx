import React, { Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Link, Nowrap } from 'ui/elements'
import { modal } from 'views/common/decorators'
import { Panel } from 'ui/compounds'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: ${
    ({ theme }) => theme.spacing.medium
  }
`

const Image = styled.img`
  height: 50vh;
  max-height: 500px;
  max-width: 100%;
  display: block;
`

const getContentLength = (contentLength) => {
  const BYTES_TO_MB = 1/1048576
  const BYTES_TO_KB = 1/1024
  return `${ contentLength*BYTES_TO_MB>1 ? contentLength*BYTES_TO_MB+' MB' : contentLength*BYTES_TO_KB+' KB' }`
}

const ProjectMediaModal = ({
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
          <Nowrap>
            Project: { mediaInfo.project }
          </Nowrap>
          <Nowrap>
            Img name: { mediaInfo.id }
          </Nowrap>
          <Nowrap>
            Content Type: { mediaInfo.contentType }
          </Nowrap>
          <Nowrap>
            ContentLength: { getContentLength(mediaInfo.contentLength) }
          </Nowrap>
          <Nowrap>
            OriginUrl: <Link target="_blank" href={ mediaInfo.originUrl }>{ mediaInfo.originUrl }</Link>
          </Nowrap>
          <Nowrap>
            Path: <Link target="_blank" href={ mediaInfo.path }>{ mediaInfo.path }</Link>
          </Nowrap>
        </Panel.Footer>
      </Panel>
    </Fragment>
  )
}

export default modal({
  name: 'ProjectMediaModal'
})(
  connect(
    null
  )(ProjectMediaModal)
)
