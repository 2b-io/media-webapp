import pathToRegexp from 'path-to-regexp'
import querystring from 'querystring'
import { all, select, put, take } from 'redux-saga/effects'
import url from 'url'

import { actions, selectors, types } from 'state/interface'
import { authRoutes, unauthRoutes } from 'views/route-config'

const allPaths = {
  ...authRoutes,
  ...unauthRoutes
}

const regexes = Object.entries(allPaths).map(
  ([ path, { exact, partial } ]) => {
    const keys = []
    const regex = pathToRegexp(path, keys, { end: exact })

    return { keys, path, regex, partial, exact }
  }
)

export default function*() {
  while (true) {
    yield take(types['LOCATION/ACCEPT'])

    const currentLocation = yield select(selectors.currentLocation)
    const previousLocation = yield select(selectors.previousLocation)

    const { pathname: current, search: currentSearch } = url.parse(currentLocation.pathname)

    const { pathname: previous, search: previousSearch } = url.parse(previousLocation.pathname || currentLocation.pathname)

    const currentQuery = currentSearch && querystring.parse(currentSearch.replace(/^\?/, ''))
    const previousQuery = previousSearch && querystring.parse(previousSearch.replace(/^\?/, ''))

    const { actions: routingActions, enteringParams, leavingParams } = regexes
      // check enter & leave
      .map(
        r => ({
          ...r,
          enter: r.regex.test(current),
          leave: current !== previous && r.regex.test(previous),
        })
      )
      // filter unmatched regexes
      .filter(({ enter, leave }) => enter || leave)
      // analyze parameters
      .map(
        r => ({
          ...r,
          // leave: (r.enter && r.partial) ? false : r.leave,
          regexFrags: r.regex.exec(r.enter ? current : previous)
        })
      )
      // extract parameters from pathname
      .map(
        r => ({
          ...r,
          parameters: r.keys.reduce(
            (combine, key, index) => ({
              ...combine,
              [ key.name ]: r.regexFrags[ index + 1 ]
            }), {}
          ),
          onEnter: (allPaths[ r.path ] || {}).onEnter,
          onLeave: (allPaths[ r.path ] || {}).onLeave
        })
      )
      // call onEnter * onLeave
      .reduce(
        (collector, r) => {
          let enteringActions = []
          let leavingActions = []

          if (!collector.enterEnd && r.enter) {
            console.debug(`Entering ${ current } [${ r.path }]`)

            if (r.onEnter) {
              enteringActions = r.onEnter(r.parameters, currentQuery)
            }
          } else if (!collector.leaveEnd && r.leave) {
            console.debug(`Leaving ${ previous } [${ r.path }]`)

            if (r.onLeave) {
              leavingActions = r.onLeave(r.parameters, previousQuery)
            }
          }

          return {
            enterEnd: r.enter && r.exact,
            leaveEnd: r.leave && r.exact,
            actions: [
              ...collector.actions,
              ...leavingActions,
              ...enteringActions
            ],
            enteringParams: {
              ...collector.enteringParams,
              ...(r.enter ? r.parameters : {})
            },
            leavingParams: {
              ...collector.leavingParams,
              ...(r.leave ? r.parameters : {})
            }
          }
        }, {
          end: false,
          actions: [],
          enteringParams: {},
          leavingParams: {}
        }
      )

    yield all([
      put(actions.updateParams({
        currentParams: enteringParams,
        previousParams: leavingParams,
        currentQuery,
        previousQuery
      })),
      ...routingActions.map(action => put(action))
    ])
  }
}
