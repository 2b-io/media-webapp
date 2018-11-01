import React from 'react'
import { connect } from 'react-redux'
import styled, { css, keyframes } from 'styled-components'

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

const Border = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  border: 1px solid ${ ({ theme }) => theme.secondary.base };
`

const toastProgress = keyframes`
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
`

const Progress = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: ${
    ({ theme }) => theme.secondary.base
  };
  animation: ${ toastProgress } ${ ({ expiring }) => expiring } linear;
`

const Content = styled.div`
  position: relative;
  box-shadow: 4px 4px ${ ({ theme }) => theme.black.opaque.base };
  background: ${
    ({ theme, type }) => (
      type === 'error' ? '#FF3333' : theme.white.base
    )
  };
`

const ToastContent = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 16px;
  background: transparent;
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
  <Content type={ type }>
    <Border />
    { expiring && <Progress expiring={ expiring } /> }
    <ToastContent
      type={ type }
      onClick={ () => removeToast(id) }
    >
      <Text mostLeft mostRight>
        { message }
      </Text>
    </ToastContent>
  </Content>
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
