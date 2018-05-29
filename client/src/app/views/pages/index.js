import React from 'react'

import Dashboard from './dashboard'
import SignIn from './sign-in'
import SignUp from './sign-up'

export const overlay = [
  {
    path: '/splash',
    exact: true,
    component: () => (
      <div className="transition-item">
        <h1>Loading...</h1>
      </div>
    )
  },
  {
    path: '/sign-in',
    exact: true,
    component: SignIn
  },
  {
    path: '/sign-up',
    exact: true,
    component: SignUp
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
    component: () => (
      <div className="transition-item">
        <h1>DASHBOARD</h1>
      </div>
    )
  }
]
