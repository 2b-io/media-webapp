import React from 'react'
const Body = ({ dataBody }) => (
  dataBody.map(
    (row, index) => (
      <tr key={ index }>
        {
          Object.values(row).map(
            (data, index) => {
              if (typeof(data) === 'object') {
                return null
              }

              return (
                <td key={ index }>{ data }</td>
              )
            }
          )
        }
      </tr>
    )
  )
)

export default Body
