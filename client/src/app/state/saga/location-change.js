import pathToRegexp from 'path-to-regexp'
import { all, select, put, take } from 'redux-saga/effects'

import { selectors, types } from 'state/interface'
import { authRoutes, unauthRoutes } from 'views/route-config'

const allPaths = {
  ...authRoutes,
  ...unauthRoutes
}

const regexes = Object.keys(allPaths).map(
  path => {
    const keys = []
    const regex = pathToRegexp(path, keys)

    return { keys, path, regex }
  }
)

export default function*() {
  while (true) {
    yield take(types['LOCATION/ACCEPT'])

    const { pathname } = yield select(selectors.currentLocation)

    const actions = regexes.filter(
      r => r.regex.test(pathname)
    ).map(
      ({ keys, path }) => ({
        path,
        pathname,
        parameters: keys.reduce(
          (combine, key, index) => ({
            ...combine,
            [key.name]: m.regex.exec(pathname)[index + 1]
          }),
          {}
        )
      })
    ).reduce(
      (actions, { path, parameters }) => {
        const { onEnter } = allPaths[path] || {}

        if (!onEnter) {
          return actions
        }

        return [
          ...actions,
          ...[
            ...(onEnter(parameters) || [])
          ]
        ]
      },
      []
    )

    yield all(actions.map(action => put(action)))
  }
}
