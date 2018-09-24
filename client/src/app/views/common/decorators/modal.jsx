import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Portal } from 'react-portal'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { TitleBar } from 'ui/compounds'
import { Button } from 'ui/elements'
import { CloseIcon } from 'ui/icons'
import { stateful } from 'views/common/decorators'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  overflow-x: hidden;
  overflow-y: auto;
  background: ${
    ({ theme }) => theme.black.opaque.base
  };
  padding: 0 16px;
`

const Wrapper = styled.div`
  background: ${ ({ theme }) => theme.background.base };
  color: ${ ({ theme }) => theme.background.on.base };
  position: relative;
  margin: 72px auto 16px;
  box-shadow: 0 30px 80px ${
    ({ theme }) => theme.secondary.opaque.base
  };
  min-width: 280px; /* support iphone5s */
`

const Header = styled.div`
  background: ${ ({ theme }) => theme.primary.base };
  color: ${ ({ theme }) => theme.primary.on.base };
`

export default ({
  name,
  enableStateful = true
}) => WrappedComponent => {
  const ModalContent = enableStateful ?
    stateful({
      component: `modal/${ name }`
    })(WrappedComponent) : WrappedComponent

  class Modal extends Component {
    componentWillUnmount() {
      this.props.hide()
    }

    hide() {
      return () => {
        const { onHide } = this.props
        const allowHide = onHide ? (onHide() === false) : true

        if (!allowHide) {
          return
        }

        this.props.hide()
      }
    }

    render() {
      const {
        hideOnClickOutside,
        modal,
        showCloseButton,
        title,
        width
      } = this.props

      if (!modal) {
        return null
      }

      return (
        <Portal node={ document && document.getElementById('root') }>
          <Overlay onClick={ hideOnClickOutside ? this.hide() : null }>
            <Wrapper onClick={ e => e.stopPropagation() } width={ width }>
              {
                title ?
                  <Header>
                    <TitleBar>
                      <TitleBar.Title>{ title }</TitleBar.Title>
                      { showCloseButton &&
                        <TitleBar.Menu>
                          <Button plain onClick={ this.hide() }>
                            <CloseIcon size="medium" />
                          </Button>
                        </TitleBar.Menu>
                      }
                    </TitleBar>
                  </Header> : null
              }
              <ModalContent modal={ modal } { ...this.props } />
            </Wrapper>
          </Overlay>
        </Portal>
      )
    }
  }

  Modal.propTypes = {
    hideOnClickOutside: PropTypes.bool,
    showCloseButton: PropTypes.bool,
    width: PropTypes.oneOf([ 'narrow', 'wide' ])
  }

  Modal.defaultProps = {
    hideOnClickOutside: true,
    showCloseButton: true
  }

  return connect(
    state => ({
      modal: selectors.modal(state, name)
    }),
    mapDispatch({
      hide: () => actions.hideModal({
        modal: name
      })
    })
  )(Modal)
}
