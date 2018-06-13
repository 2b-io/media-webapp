import React from 'react'
import styled from 'styled-components'
import Rows from './rows'
import Col from './col'

const table = ({dataRows}) => {
  return (<Table >
    <tbody>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Slug</th>
      </tr>
      <Rows dataRows={dataRows}/>
    </tbody>
  </Table>)
}
export default table

const Table = styled.table `
  { font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even) {
      background-color: #dddddd;
  }
`
