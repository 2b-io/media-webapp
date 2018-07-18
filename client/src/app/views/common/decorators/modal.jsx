import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Portal } from 'react-portal'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapDispatch } from 'services/redux-helpers'
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
  background: ${ ({ theme }) => theme.secondary.opaque.base };
  padding-left: ${ ({ theme }) => theme.spacing.medium };
  padding-right: ${ ({ theme }) => theme.spacing.medium };
`

const Wrapper = styled.div`
  background: ${ ({ theme }) => theme.background.base };
  color: ${ ({ theme }) => theme.background.on.base };
  position: relative;
  margin: ${
    ({ theme: { spacing } }) => `${ spacing.huge } auto ${spacing.big }`
  };
  padding: ${ ({ theme }) => theme.spacing.medium };
  box-shadow: 0 30px 80px ${ ({ theme }) => theme.secondary.limpid.base };
  min-width: 280px; /* support iphone5s */
  max-width: ${
    ({ width }) => width === 'wide' ? '960px' : (width === 'narrow' ? '640px' : 'auto')
  };
`

const Header = styled.div`
  margin-bottom: ${ ({ theme }) => theme.spacing.small };
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
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
        modal,
        hideOnClickOutside,
        showCloseButton,
        width
      } = this.props

      if (!modal) {
        return null
      }

      return (
        <Portal node={ document && document.getElementById('root') }>
          <Overlay onClick={ hideOnClickOutside ? this.hide() : null }>
            <Wrapper onClick={ e => e.stopPropagation() } width={ width }>
              <Header>
                {
                  showCloseButton && (
                    <Button plain onClick={ this.hide() }>
                      <CloseIcon size="medium" />
                    </Button>
                  )
                }
              </Header>
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
      modal: state.modal[name]
    }),
    mapDispatch({
      hide: () => ({
        type: '@@MODAL/HIDE',
        payload: { modal: name }
      })
    })
  )(Modal)
}
