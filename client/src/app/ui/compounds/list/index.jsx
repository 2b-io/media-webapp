import styled from 'styled-components'

const List = styled.ul`
`

List.Item = styled.li`
  padding: ${
    ({ theme }) => `
      ${ theme.spacing.small }
      ${ theme.spacing.medium }
    `
  }
`

export default List
