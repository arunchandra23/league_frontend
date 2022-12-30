import React from 'react'
import api from '../../api'

const Table = ({isAdmin,rowData,handlerefetch}) => {
  const cancleBooking=async(booking_id)=>{
    await api.put('/cancleBooking',{booking_id:booking_id}).then(()=>{handlerefetch()})

}
  return (
    <table className="ui  single line celled table">
  <thead>
    <tr>
      <th>Name</th>
      <th>E-mail</th>
      {isAdmin?<th>Contact</th>:null}
      <th>Arena</th>
      <th>Slot</th>
      {isAdmin?<th>Actions</th>:null}
    </tr>
  </thead>
  <tbody>
    {rowData.map((row)=>{
        // console.log(row);
        return (
          <tr key={row.booking_id}>
            <td>{row.name}</td>
            <td>{row.email}</td>
            {isAdmin?<td>{row.contact}</td>:null}
            <td>{row.ground_name}</td>
            <td>{row.slot_time}</td>
            {isAdmin?<button className="negative ui button" onClick={()=>{cancleBooking(row.booking_id)}}>Cancle Booking</button>:null}
            </tr>
            )
    })}
  </tbody>
</table>
  )
}

export default Table