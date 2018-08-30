import React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import mime from 'mime'

import { mapState } from 'services/redux-helpers'
import { selectors } from 'state/interface'
import { Panel, TitleBar } from 'ui/compounds'
import { Button, Container, MasonryLayout, Paragraph } from 'ui/elements'
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

const resizeImage = (contentType, id, project, cdnUrl = 'http://localhost:3002') => {
  return `${ cdnUrl }/s/${ project }/${ id }/default/crop_200x100.${ mime.getExtension(contentType) }`
}

const Media = ({
  mediaValue
}) => {
  const imgResized = resizeImage(mediaValue.contentType, mediaValue.id, mediaValue.project)

  return (
    <Panel>
      <Panel.Content>
        <Container>
          <MediaImage
            url={ imgResized }
          />
        </Container>
      </Panel.Content>
      {
        <Panel.Footer>
          <TitleBar>
            <TitleBar.Title>
              <span>
                { mediaValue.path }
              </span>
            </TitleBar.Title>
            <TitleBar.Menu>
              <Button plain onClick={ () => true }>
                <CopyIcon size="small" />
              </Button>
            </TitleBar.Menu>
          </TitleBar>
          <TitleBar>
            <TitleBar.Title>
              <span>
                { mediaValue.originUrl }
              </span>
            </TitleBar.Title>
            <TitleBar.Menu>
              <Button plain onClick={ () => true }>
                <CopyIcon size="small" />
              </Button>
            </TitleBar.Menu>
          </TitleBar>
        </Panel.Footer>
      }
    </Panel>
  )
}


const ProjectMedia = ({
  // toMediaDetail,
  listMedia
}) => {

  if (!listMedia || !listMedia.length) {
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

  const items = listMedia.map(
    mediaValue => ({
      grid: { w: 1, h: 1 },
      component: () => (
        <Media
          mediaValue={ mediaValue }
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
  null
)(ProjectMedia)
