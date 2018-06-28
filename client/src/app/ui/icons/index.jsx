import React from 'react'
import Icon from 'react-icons-kit'
import styled from 'styled-components'

import { creditCard } from 'react-icons-kit/feather/creditCard'
import { dollarSign } from 'react-icons-kit/feather/dollarSign'
import { github } from 'react-icons-kit/feather/github'
import { grid } from 'react-icons-kit/feather/grid'
import { helpCircle } from 'react-icons-kit/feather/helpCircle'
import { list } from 'react-icons-kit/feather/list'
import { logOut } from 'react-icons-kit/feather/logOut'
import { moreVertical } from 'react-icons-kit/feather/moreVertical'
import { plus } from 'react-icons-kit/feather/plus'
import { user } from 'react-icons-kit/feather/user'
import { x } from 'react-icons-kit/feather/x'

const StyledIcon = styled(Icon)`
  color: ${
    ({ inverted = false }) => inverted ? '#fff' : '#000'
  }
`

const s = ({ medium, large, extraLarge }) => (
  extraLarge ? 48 : (large ? 32 : (medium ? 24 : 16))
)

const icon = type => {
  const Icon = ({ inverted = 0, ...props }) => (
    <StyledIcon
      inverted={ Number(inverted) }
      icon={ type }
      size={ s(props) }
      { ...props }
    />
  )

  return Icon
}

export const AddIcon = icon(plus)
export const BillingIcon = icon(dollarSign)
export const CloseIcon = icon(x)
export const DashboardIcon = icon(grid)
export const GithubIcon = icon(github)
export const HelpIcon = icon(helpCircle)
export const MoreIcon = icon(moreVertical)
export const PaymentIcon = icon(creditCard)
export const ProfileIcon = icon(user)
export const ProjectListIcon = icon(list)
export const SignOutIcon = icon(logOut)
