import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { selectors } from 'state/interface'
import { stateful } from 'views/common/decorators'

const Wrapper = styled.div`
  background: ${ ({ theme }) => theme.background.base };
  color: ${ ({ theme }) => theme.background.on.base };
`

export default ({
  name,
  enableStateful = true
}) => WrappedComponent => {
  const Content = enableStateful ?
    stateful({
      component: `dialog/${ name }`
    })(WrappedComponent) : WrappedComponent

  class Dialog extends Component {

    render() {
      const {
        dialog
      } = this.props

      if (!dialog) {
        return null
      }

      return (
        <Wrapper>
          <Content dialog={ dialog } { ...this.props } />
        </Wrapper>
      )
    }
  }


  Dialog.propTypes = {
    showCloseButton: PropTypes.bool,
  }

  Dialog.defaultProps = {
    showCloseButton: true
  }

  return connect(
    state => ({
      dialog: selectors.dialog(state, name)
    }),
    null
  )(Dialog)
}
