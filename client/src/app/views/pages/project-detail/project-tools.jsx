import React from 'react'

import { List } from 'ui/compounds'
import { Link } from 'ui/elements'

const ProjectTools = ({
  toCacheInvalidator,
  toProjectMedia,
  slug
}) => (
  <List>
    <List.Item>
      <Link href={ `/projects/${ slug }/cache-invalidator` } onClick={ toCacheInvalidator }>Cache Invalidator</Link>
    </List.Item>
    <List.Item>
      <Link href={ `/projects/${ slug }/media` } onClick={ toProjectMedia }>Project Media</Link>
    </List.Item>
  </List>
)
export default ProjectTools
