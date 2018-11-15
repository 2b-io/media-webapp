import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import mime from 'mime'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { mapDispatch } from 'services/redux-helpers'
import { mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Panel, TitleBar } from 'ui/compounds'
import { Container, MasonryLayout, Paragraph, PlainButton } from 'ui/elements'
import { CopyIcon } from 'ui/icons'

const MediaImage = styled.div`
  width: 100%;
  height: 100px;
  display: block;
  ${
  ({ url }) => css`
    background: url(${ url });
    background-repeat: no-repeat;
    background-size: cover;
  `
  }
`

const resizeImage = (contentType, id, project, cdnUrl) => {
  return `${ cdnUrl }/s/${ project }/${ id }/default/crop_200x100.${ mime.getExtension(contentType) }`
}

const Media = ({
  mediaInfo,
  showToast,
  toProjectMediaDialog
}) => {
  const imgResized = resizeImage(mediaInfo.contentType, mediaInfo.id, mediaInfo.project, mediaInfo.cdnUrl)

  return (
    <Fragment>
      <Panel>
        <Panel.Content>
          <Container>
            <MediaImage
              url={ imgResized }
              onClick={ () => toProjectMediaDialog(mediaInfo) }
            />
          </Container>
          <TitleBar>
            <TitleBar.Title>
              <span>
                { mediaInfo.path }
              </span>
            </TitleBar.Title>
            <TitleBar.Menu>
              <CopyToClipboard onCopy={ showToast } text={ mediaInfo.path }>
                <PlainButton>
                  <CopyIcon size="small" />
                </PlainButton>
              </CopyToClipboard>
            </TitleBar.Menu>
          </TitleBar>
          <TitleBar>
            <TitleBar.Title>
              <span>
                { mediaInfo.originUrl }
              </span>
            </TitleBar.Title>
            <TitleBar.Menu>
              <CopyToClipboard onCopy={ showToast } text={ mediaInfo.originUrl }>
                <PlainButton>
                  <CopyIcon size="small" />
                </PlainButton>
              </CopyToClipboard>
            </TitleBar.Menu>
          </TitleBar>
        </Panel.Content>

      </Panel>

    </Fragment>
  )
}


const ProjectMedia = ({
  listMedia,
  showToast,
  toProjectMediaDialog
}) => {

  if (!listMedia || !Object.keys(listMedia).length) {
    return (
      <main>
        <Container>
          <Paragraph>
            You do not have any media yet.
          </Paragraph>
        </Container>
      </main>
    )
  }

  const items = Object.values(listMedia).map(
    mediaInfo => ({
      key: mediaInfo.id,
      grid: { w: 1, h: 1 },
      component: () => (
        <Media
          mediaInfo={ mediaInfo }
          showToast={ showToast }
          toProjectMediaDialog={ toProjectMediaDialog }
        />
      )
    })
  )

  return (
    <main>
      <Container>
        <MasonryLayout
          items={ items }
        />
      </Container>
    </main>
  )
}

export default connect(
  mapState({
    listMedia: selectors.listMedia,
  }),
  mapDispatch({
    toProjectMediaDialog: true,
    showToast: actions.copyMediaLink
  })

)(ProjectMedia)
