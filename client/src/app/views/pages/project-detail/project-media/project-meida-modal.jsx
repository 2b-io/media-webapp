import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Container, Paragraph } from 'ui/elements'
import { modal } from 'views/common/decorators'

// const Layout = styled.div`
//   display: flex;
//   justify-content: space-between;
// `

const ProjectMediaModal = ({
  modal: { params: { mediaInfo } }
}) => {

  return (
    <Container center>
      <Paragraph>
        img name: { mediaInfo.id }
      </Paragraph>
    </Container>
  )
}

export default modal({
  name: 'ProjectMediaModal'
})(
  connect(
    null
  )(ProjectMediaModal)
)
