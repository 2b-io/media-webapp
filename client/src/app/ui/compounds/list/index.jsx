import styled from 'styled-components'

const Item = styled.li`
  padding: ${
    ({ theme }) => `
      ${ theme.spacing.small }
      ${ theme.spacing.medium }
    `
  }
`

const List = styled.ul`
  & > ${ Item }:not(:last-child) {
    border-bottom: 1px solid ${
      ({ theme }) => theme.primary.base
    };
  }
`

List.Item = Item

export default List
