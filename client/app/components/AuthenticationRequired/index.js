import { verifySession } from 'actions/session'
import ConditionalRenderer from 'components/ConditionalRenderer'

export default ConditionalRenderer(
  props => {
    let { dispatch } = props

    dispatch(verifySession())
  },
  props => {
    let { session } = props

    return !!(session && session.id)
  },
  state => ({ session: state.session })
)
