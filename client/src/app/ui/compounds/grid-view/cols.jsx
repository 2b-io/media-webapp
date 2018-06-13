import React from 'react'

const Col = ({dataCols}) => (<tr>
  {dataCols.map((element, index) => (<th key={index}>{element}</th>))}
</tr>)
export default Col
