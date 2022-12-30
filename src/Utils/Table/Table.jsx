import React from 'react'

const Table = ({rowData}) => {
  return (
    <table className="ui single line table">
  <thead>
    <tr>
      <th>Name</th>
      <th>E-mail address</th>
      <th>Arena</th>
      <th>Slot</th>
    </tr>
  </thead>
  <tbody>
    {rowData.map((row)=>{
        // console.log(row);
        return (
          <tr key={row.booking_id}>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.ground_name}</td>
            <td>{row.slot_time}</td>
            </tr>
            )
    })}
  </tbody>
</table>
  )
}

export default Table