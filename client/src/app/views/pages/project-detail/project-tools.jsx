import React from 'react'

import { List } from 'ui/compounds'
import { Link } from 'ui/elements'

const ProjectTools = ({ toCacheInvalidator }) => (
  <List>
    <List.Item>
      <Link href='/project/' onClick={ toCacheInvalidator }>Cache Invalidator</Link>
    </List.Item>
  </List>
)
export default ProjectTools
