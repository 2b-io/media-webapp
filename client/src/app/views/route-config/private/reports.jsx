import { actions } from 'state/interface'
import * as Reports from 'views/pages/reports'

export default {
  '/reports': {
    component: Reports,
    exact: true
  }
}


