import React from 'react'

import Dashboard from './dashboard'
import SignIn from './sign-in'

export const overlay = [
  {
    path: '/splash',
    exact: true,
    component: () => <h1>Loading...</h1>
  },
  {
    path: '/sign-in',
    exact: true,
    component: SignIn
  }
]

export const content = [
  {
    path: '/',
    exact: true,
    component: Dashboard
  }
]

export const still = [
  {
    path: '/',
    exact: true,
    component: () => <h1>Dashboard</h1>
  }
]
