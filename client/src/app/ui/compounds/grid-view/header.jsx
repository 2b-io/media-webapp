import React from 'react'

const Header = ({dataHeader}) => (
  <tr>
   { dataHeader.map((element, index) => (
      <th key={index}>
        {element}
      </th>
      ))}
  </tr>
)
export default Header
