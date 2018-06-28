import PropTypes from 'prop-types'
import React from 'react'
import { Portal } from 'react-portal'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapDispatch } from 'services/redux-helpers'
import { CloseIcon } from 'ui/icons'
import { stateful } from 'views/common/decorators'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: rgba(0, 0, 0, .2);
  padding-left: 20px;
  padding-right: 20px;
`

const Wrapper = styled.div`
  background: #ffffff;
  position: relative;
  top: 100px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
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

const CloseButton = styled.button.attrs({
  type: 'button'
})`
  appearance: 'none';
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
`

export default ({
  name,
  enableStateful = true
}) => WrappedComponent => {
  const ModalContent = enableStateful ?
    stateful({
      component: `modal/${ name }`
    })(WrappedComponent) : WrappedComponent

  const Modal = ({ show, hide, hideOnClickOutside, showCloseButton, width }) => {
    if (!show) {
      return null
    }

    return (
      <Portal>
        <Overlay onClick={ hideOnClickOutside ? hide : null }>
          <Wrapper onClick={ e => e.stopPropagation() } width={ width }>
            <Header>
              {
                showCloseButton && (
                  <CloseButton onClick={ hide }>
                    <CloseIcon />
                  </CloseButton>
                )
              }
            </Header>
            <ModalContent />
          </Wrapper>
        </Overlay>
      </Portal>
    )
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
      show: state.modal[name]
    }),
    mapDispatch({
      hide: () => ({
        type: '@@MODAL/HIDE',
        payload: { modal: name }
      })
    })
  )(Modal)
}
