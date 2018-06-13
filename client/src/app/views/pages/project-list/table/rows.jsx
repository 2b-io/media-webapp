import React from 'react'
const Rows = ({dataRows}) => (dataRows.map((row, index) => (<tr key={`tr+${index}`}>
  {
    Object.values(row).map((el, indexEl) => {
      if (typeof(el) === 'object')
        return
      return (<td key={`indexEl+${indexEl}+${index}`}>
        {el}
      </td>)
    })
  }
</tr>)))

export default Rows
