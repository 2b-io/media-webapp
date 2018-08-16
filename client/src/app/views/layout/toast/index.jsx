import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapState } from 'services/redux-helpers'
import { selectors } from 'state/interface'
import { ErrorBox, InfoBox, SuccessBox, WarningBox } from 'ui/elements'

const Wrapper = styled.section`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: ${
    ({ theme }) => `0 ${ theme.spacing.medium }`
  };
  z-index: 11;
`

const ToastList = styled.div`
`

const Shadow = styled.div`
  box-shadow: 0 5px 20px ${ ({ theme }) => theme.secondary.limpid.base };
`

const Toast = ({ toast: { expiring, message, type } }) => {
  const DisplayComponent = (
    type === 'error' ?
      ErrorBox : (
        type === 'warn' ?
          WarningBox : (
            type === 'success' ?
              SuccessBox : InfoBox
          )
      )
  )

  return (
    <Shadow>
      <DisplayComponent interactable
        expiring={ expiring }
      >
        { message }
      </DisplayComponent>
    </Shadow>
  )
}

const ToastContainer = ({ toasts }) => (
  <Wrapper>
    <ToastList>
      {
        toasts.map(
          toast => (
            <Toast
              key={ toast.id }
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
  })
)(ToastContainer)
