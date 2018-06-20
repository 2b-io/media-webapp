import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Body from './body'
import Header from './header'

const GridView = ({ dataHeader, dataBody }) => {
  if (!dataHeader.length || !dataBody.length) {
    return null
  }

  return (
    <Table>
     <thead>
       <Header dataHeader={ dataHeader } />
     </thead>
      <tbody>
        <Body dataBody={ dataBody } />
      </tbody>
    </Table>
  )
}
GridView.propTypes = {
  dataHeader: PropTypes.arrayOf(PropTypes.string),
  dataBody: PropTypes.arrayOf(PropTypes.object)
}
GridView.defaultProps = {
  dataHeader: [ 'col1', 'col2', 'col3' ],
  dataBody: [ { key1: 'value1', key2: 'value2', key3: 'value3' } ]
}

const Table = styled.table`
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

export default GridView
