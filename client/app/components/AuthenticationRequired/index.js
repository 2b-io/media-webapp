import { getSession } from 'core/actions'
import ConditionalRenderer from 'components/ConditionalRenderer'

export default ConditionalRenderer(
  props => {
    let { dispatch } = props

    dispatch(getSession())
  },
  props => {
    let { session } = props

    return !!session
  },
  state => ({ session: state.session })
)
