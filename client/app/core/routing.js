export const routes = [
  {
    name: 'root',
    routes: [
      {
        path: '/',
        exact: true
      },
      {
        path: '/sign-in',
        exact: true
      },
      {
        path: '/tenant/:id'
      }
    ]
  }
]
