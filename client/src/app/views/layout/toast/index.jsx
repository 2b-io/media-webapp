import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Text } from 'ui/typo'

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 16px;
  right: 32px;
  left: 32px;
  z-index: 11;
`

const ToastList = styled.div`
  width: 100%
`

const Shadow = styled.div`
  box-shadow: 4px 4px ${ ({ theme }) => theme.black.opaque.base };
`

const DisplayComponent = styled.div`
  border: 1px solid black;
  padding: 8px 0;
  margin-bottom: 16px;
  background: ${
    ({ theme, type }) => (
      type === 'error' ? '#FF3333' : theme.white.base
    )
  };
  color: ${
    ({ theme, type }) => (
      type === 'error' ? theme.white.base : theme.black.base
    )
  };
`

const Toast = ({
  removeToast,
  toast: {
    expiring,
    id,
    message,
    type
  }
}) => (
  <Shadow>
    <DisplayComponent
      expiring={ expiring }
      interactable
      type={ type }
      onClick={ () => removeToast(id) }
    >
      <Text mostLeft mostRight>
        { message }
      </Text>
    </DisplayComponent>
  </Shadow>
)


const ToastContainer = ({
  removeToast,
  toasts
}) => (
  <Wrapper>
    <ToastList>
      {
        toasts.map(
          toast => (
            <Toast
              key={ toast.id }
              removeToast={ removeToast }
              toast={ toast }
            />
          )
        )
      }
    </ToastList>
  </Wrapper>
)

export default connect(
  mapState({
    toasts: selectors.toasts
  }),
  mapDispatch({
    removeToast: actions.removeToast
  })
)(ToastContainer)
