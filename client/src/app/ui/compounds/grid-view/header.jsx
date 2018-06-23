import React from 'react'

const Header = ({ dataHeader }) => (
  <tr>
    {
      dataHeader.map(
        (data, index) => <th key={ index }>{ data }</th>
      )
    }
  </tr>
)

export default Header
