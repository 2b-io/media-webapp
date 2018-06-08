import React from 'react'
import Row from './row'
import Col from './col'

const table = ({dataCols,dataRows}) => {
    let cols = dataCols.map((col,index)=> { console.log(`col+${index}`); return(<Col col ={col} key={`col+${index}`}/>)})
    let rows = dataRows.map((row,index)=> (
      <tr key={`tr+${index}`}>
        {/* {Object.keys(row).map((el,indexEl)=>  <Row row ={el} key={`indexEl+${indexEl}`}/>)} */}
      </tr>))
    return  (
      <table>
        <tr>
          {cols}
        </tr>
        {/* {rows} */}
     </table>
  )
}
export default table
