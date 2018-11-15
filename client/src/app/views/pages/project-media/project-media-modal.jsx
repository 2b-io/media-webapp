import React, { Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { actions } from 'state/interface'
import { Link, PlainButton } from 'ui/elements'
import { mapDispatch } from 'services/redux-helpers'
import { Panel } from 'ui/compounds'

const WrapperImage = styled.div`
  display: flex;
  justify-content: center;
  padding: ${
    ({ theme }) => theme.spacing.medium
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

const Wrapper = styled.div`
  padding: ${
    ({ theme }) => `${ theme.spacing.small } 0`
  }
  display: flex;
  flex-direction: column;
`

const WrapperItem = styled.span`
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const WrapperTitle = styled.div`
  width: 150px;
  flex-shrink: 0;
  flex-wrap: nowrap;
  padding-right: ${
    ({ theme }) => theme.spacing.small
  }
`

const WrapperInfo = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StyleButton = styled.div`
  padding: ${
    ({ theme }) => `0 ${ theme.spacing.medium } ${ theme.spacing.medium }`
  }
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
          <WrapperImage>
            <Image
              src={ mediaInfo.path }
            />
          </WrapperImage>
        </Panel.Content>
        <Panel.Footer>
          <Wrapper>
            <WrapperItem>
              <WrapperTitle>
                Project
              </WrapperTitle>
              <WrapperInfo>
                { mediaInfo.project }
              </WrapperInfo>
            </WrapperItem>
            <WrapperItem>
              <WrapperTitle>
                Image name
              </WrapperTitle>
              <WrapperInfo>
                { mediaInfo.id }
              </WrapperInfo>
            </WrapperItem>
            <WrapperItem>
              <WrapperTitle>
                Content Type
              </WrapperTitle>
              <WrapperInfo>
                { mediaInfo.contentType }
              </WrapperInfo>
            </WrapperItem>
            <WrapperItem>
              <WrapperTitle>
                Content Length
              </WrapperTitle>
              <WrapperInfo>
                { getContentLength(mediaInfo.contentLength) }
              </WrapperInfo>
            </WrapperItem>
            <WrapperItem>
              <WrapperTitle>
                OriginUrl
              </WrapperTitle>
              <WrapperInfo>
                <Link target="_blank" href={ mediaInfo.originUrl }>{ mediaInfo.originUrl }</Link>
              </WrapperInfo>
            </WrapperItem>
            <WrapperItem>
              <WrapperTitle>
                Path
              </WrapperTitle>
              <WrapperInfo>
                <Link target="_blank" href={ mediaInfo.path }>{ mediaInfo.path }</Link>
              </WrapperInfo>
            </WrapperItem>
          </Wrapper>
        </Panel.Footer>
        <StyleButton>
          <PlainButton
            onClick={ () => removeProjectMedia(mediaInfo.project, mediaInfo.id) }
          >Remove media</PlainButton>
        </StyleButton>
      </Panel>
    </Fragment>
  )
}

export default connect(
  null,
  mapDispatch({
    removeProjectMedia: actions.removeProjectMedia
  })
)(ProjectMediaModal)

