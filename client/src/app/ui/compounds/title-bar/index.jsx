import styled from 'styled-components'

import Menu from './menu'
import Title from './title'

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  padding: ${ ({ theme: { spacing } }) => `${ spacing.tiny } ${ spacing.medium }` };
  min-height: 36px;
  flex-wrap: nowrap;
`

TitleBar.Menu = Menu
TitleBar.Title = Title

export default TitleBar
