import React from 'react'
import styled from 'styled-components'

import { Identicon } from 'ui/elements'
import { DescriptionTextLine, TextLine } from 'ui/typo'

const Wrapper = styled.div`
  padding-top: 56px;
`

const Account = styled.div`
  margin-left: -40px;
  margin-right: -40px;
  position: relative;
`

const UserName = styled.div`
  padding-left: 72px;
`

const UserEmail = styled.div`
  padding-left: 72px;
  background: #e6e6e6;
`

const UserAvatar = styled.div`
  position: absolute;
  background: #e6e6e6;
  color: ${
    ({ theme }) => theme.white.on.base
  };
  width: 64px;
  height: 64px;
  bottom: 8px;
  left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

const Top = ({ account = {} }) => (
  <Wrapper>
    <Account>
      <UserAvatar>
        <Identicon circle
          size={ 56 }
          id={ account.email }
        />
      </UserAvatar>
      <UserName>
        <TextLine mostLeft mostRight>{ account.name }</TextLine>
      </UserName>
      <UserEmail>
        <DescriptionTextLine mostLeft mostRight>{ account.email }</DescriptionTextLine>
      </UserEmail>
    </Account>
  </Wrapper>
)

export default Top
