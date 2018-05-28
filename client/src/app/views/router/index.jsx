import React from 'react'

import BrowserRouter from './browser-router'
import History from './history'

export default props => (
  <History>
    <BrowserRouter config={routeConfig} />
  </History>
)

const Dashboard = (props) => <h1>Dashboard</h1>
const Splash = (props) => <h1>Loading...</h1>

const routeConfig = [
  {
    path: '/',
    exact: true,
    component: Dashboard
  },
  {
    path: '/splash',
    exact: true,
    component: Splash
  }
]
