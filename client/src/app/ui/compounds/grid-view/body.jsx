import React from 'react'
const Body = ({dataBody}) => (
  dataBody.map((row, index) => (
    <tr key={`tr+${index}`}>
      {
        Object.values(row).map((element, indexEl) => {
          if (typeof(element) === 'object')
            return
          return (<td key={`indexEl.${indexEl}.${index}`}>
            {element}
          </td>)
        })
      }
    </tr>)))

export default Body
