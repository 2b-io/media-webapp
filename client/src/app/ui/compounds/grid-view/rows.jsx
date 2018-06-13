import React from 'react'
const Rows = ({dataRows}) => (
  dataRows.map((row, index) => (
    <tr key={`tr+${index}`}>
      {
        Object.values(row).map((element, indexEl) => {
          if (typeof(element) === 'object')
            return
          return (<td key={`indexEl+${indexEl}+${index}`}>
            {element}
          </td>)
        })
      }
    </tr>)))

export default Rows
