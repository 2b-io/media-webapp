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
  background: ${ ({ theme }) => theme.secondary.opaque.base };
  padding-left: 20px;
  padding-right: 20px;
`

const Wrapper = styled.div`
  background: ${ ({ theme }) => theme.background.base };
  color: ${ ({ theme }) => theme.background.on.base };
  position: relative;
  top: 100px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  box-shadow: 0 30px 80px ${ ({ theme }) => theme.primary.limpid.base };
  min-width: 300px;
  max-width: ${
    ({ width }) => width === 'wide' ? '960px' : (width === 'narrow' ? '640px' : 'auto')
  };
`

const Header = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  height: 30px;
`

export default ({
  name,
  enableStateful = true,
  onEnter = () => {},
  onExit = () => {},
}) => WrappedComponent => {
  const ModalContent = enableStateful ?
    stateful({
      component: `modal/${ name }`
    })(WrappedComponent) : WrappedComponent

  class Modal extends Component {
    componentWillReceiveProps(nextProps) {
      const { dispatch, modal } = this.props
      const { modal: nextModal } = nextProps

      if (modal === nextModal) {
        return
      }

      if (nextModal) {
        onEnter(dispatch, nextModal)
      } else {
        onExit(dispatch)
      }
    }

    render() {
      const { modal, hide, hideOnClickOutside, showCloseButton, width } = this.props

      if (!modal) {
        return null
      }

      return (
        <Portal node={ document && document.getElementById('root') }>
          <Overlay onClick={ hideOnClickOutside ? hide : null }>
            <Wrapper onClick={ e => e.stopPropagation() } width={ width }>
              <Header>
                {
                  showCloseButton && (
                    <Button plain onClick={ hide }>
                      <CloseIcon />
                    </Button>
                  )
                }
              </Header>
              <ModalContent modal={ modal } />
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
