import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapState } from 'services/redux-helpers'
import { selectors } from 'state/interface'
import { Panel, TitleBar } from 'ui/compounds'
import { Button, Container, MasonryLayout, Paragraph } from 'ui/elements'
import { CopyIcon } from 'ui/icons'

const Image = styled.img`
  width: 100%;
  height: 100px;
  display: block;
`

const Media = ({
  mediaValue
}) => {
  // const croppedImg = `http://localhost:3002/u/${ slug }?url=${ mediaValue.originUrl }&w=200&h=100&m=crop`
  const croppedImg = `http://localhost:3002/u/${ 'ssss' }?url=${ mediaValue.originUrl }&w=200&h=100&m=crop`

  return (
    <Panel>
      <Panel.Content>
        <Container>
          <Image
            src={ croppedImg }
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
          // slug={ slug }
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
