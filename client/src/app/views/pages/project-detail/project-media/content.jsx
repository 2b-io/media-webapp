import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Panel, TitleBar } from 'ui/compounds'
import { Button, Container, MasonryLayout, Paragraph } from 'ui/elements'
import { CopyIcon } from 'ui/icons'

const MediaImage = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid red;
  display: block;
`

const Media = ({
  urlDetail,
  toProjectDetail
}) => (
  <Panel>
    <Panel.Content>
      <Container>
        <MediaImage />
      </Container>
    </Panel.Content>
    {
      <Panel.Footer>
        <TitleBar>
          <TitleBar.Title>
            <span>
              media info
            </span>
          </TitleBar.Title>
          <TitleBar.Menu>
            <Button plain onClick={ true }>
              <CopyIcon size="small" />
            </Button>
          </TitleBar.Menu>
        </TitleBar>
      </Panel.Footer>
    }
  </Panel>
)

const ProjectMedia = ({
  toMediaDetail,
  listMedia
}) => {
  if (!listMedia || !listMedia.length) {
    console.log('listMedia', listMedia);
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

  const items = [ ...Array(10).keys() ].map(
    () => ({
      grid: { w: 1, h: 1 },
      component: () => (
        <Media />
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
    toProjectDetail: slug => actions.requestLocation(`/projects/${ slug }`)
  })
)(ProjectMedia)
