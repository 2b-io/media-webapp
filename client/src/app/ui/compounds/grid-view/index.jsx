import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Rows from './rows'
import Cols from './cols'

const gridView = ({dataCols, dataRows}) => {
  if (!dataCols.length || !dataRows.length)
    return
  return (<Table>
    <tbody>
      <Cols dataCols={dataCols}/>
      <Rows dataRows={dataRows}/>
    </tbody>
  </Table>)
}
gridView.propTypes = {
  dataCols: PropTypes.arrayOf(PropTypes.string),
  dataRows: PropTypes.arrayOf(PropTypes.object)
}
gridView.defaultProps = {
  dataCols: ['col1','col2','col3'],
  dataRows: [{key1:'value1',key2:'value2',key3:'value3'}]
}

const Table = styled.table `
  {
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

export default gridView
