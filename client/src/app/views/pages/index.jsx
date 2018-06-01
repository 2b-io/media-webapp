import React from 'react'

import { TransactionItem } from 'ui/elements'

import * as Dashboard from './dashboard'
import SignIn from './sign-in'
import SignUp from './sign-up'

const withTransaction = Page => () => (
  <TransactionItem><Page /></TransactionItem>
)

export const overlay = [
  {
    path: '/sign-in',
    exact: true,
    component: withTransaction(SignIn)
  },
  {
    path: '/sign-up',
    exact: true,
    component: withTransaction(SignUp)
  }
]

export const content = [
  {
    path: '/',
    exact: true,
    component: Dashboard.Content
  }
]

export const still = [
  {
    path: '/',
    exact: true,
    component: Dashboard.Still
  }
]
