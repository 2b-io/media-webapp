import App from 'containers/App'
import HomePage from 'containers/HomePage/Loadable'
import SignIn from 'containers/SignIn'

export const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: HomePage
      },
      {
        path: '/sign-in',
        exact: true,
        component: SignIn
      }
    ]
  }
]
