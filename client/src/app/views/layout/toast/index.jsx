import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapState } from 'services/redux-helpers'
import { selectors } from 'state/interface'
// import { ErrorBox, InfoBox, SuccessBox, WarningBox } from 'ui/elements'
import { Text } from 'ui/typo'

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 16px;
  right: 40px;
  left: 40px;
  z-index: 11;

`

const ToastList = styled.div`
`

const Shadow = styled.div`
  box-shadow: 0 5px 20px ${ ({ theme }) => theme.secondary.limpid.base };
`

const DisplayComponent = styled.div`
  border: 1px solid black;
  padding: 16px 8px;
  margin-bottom: 16px;
  background: ${
    ({ type }) => (
      type === 'error' ? 'red' : 'white'
    )
  };
`

const Toast = ({
  toast: {
    expiring,
    message,
    type
  }
}) => {
  // const DisplayComponent = (
  //   type === 'error' ?
  //     ErrorBox : (
  //       type === 'warn' ?
  //         WarningBox : (
  //           type === 'success' ?
  //             SuccessBox : InfoBox
  //         )
  //     )
  // )

  return (
    <Shadow>
      <DisplayComponent>
        <Text mostLeft mostRight>
          { message }
        </Text>
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

// <DisplayComponent interactable expiring={ expiring } >
//     { message }
//   </DisplayComponent>
